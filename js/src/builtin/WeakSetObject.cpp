/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 4 -*-
 * vim: set ts=8 sts=4 et sw=4 tw=99:
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "builtin/WeakSetObject.h"

#include "jsapi.h"
#include "jscntxt.h"
#include "jsiter.h"

#include "builtin/SelfHostingDefines.h"
#include "vm/GlobalObject.h"
#include "vm/SelfHosting.h"

#include "jsobjinlines.h"

#include "vm/Interpreter-inl.h"
#include "vm/NativeObject-inl.h"

using namespace js;

using mozilla::UniquePtr;

const Class WeakSetObject::class_ = {
    "WeakSet",
    JSCLASS_IMPLEMENTS_BARRIERS | JSCLASS_HAS_CACHED_PROTO(JSProto_WeakSet) |
    JSCLASS_HAS_RESERVED_SLOTS(WeakSetObject::RESERVED_SLOTS)
};

const JSPropertySpec WeakSetObject::properties[] = {
    JS_PS_END
};

const JSFunctionSpec WeakSetObject::methods[] = {
    JS_SELF_HOSTED_FN("add",    "WeakSet_add",    1, 0),
    JS_SELF_HOSTED_FN("clear",  "WeakSet_clear",  0, 0),
    JS_SELF_HOSTED_FN("delete", "WeakSet_delete", 1, 0),
    JS_SELF_HOSTED_FN("has",    "WeakSet_has",    1, 0),
    JS_FS_END
};

JSObject*
WeakSetObject::initClass(JSContext* cx, JSObject* obj)
{
    Rooted<GlobalObject*> global(cx, &obj->as<GlobalObject>());
    RootedPlainObject proto(cx, NewBuiltinClassInstance<PlainObject>(cx));
    if (!proto)
        return nullptr;

    Rooted<JSFunction*> ctor(cx, global->createConstructor(cx, construct, ClassName(JSProto_WeakSet, cx), 0));
    if (!ctor ||
        !LinkConstructorAndPrototype(cx, ctor, proto) ||
        !DefinePropertiesAndFunctions(cx, proto, properties, methods) ||
        !GlobalObject::initBuiltinConstructor(cx, global, JSProto_WeakSet, ctor, proto))
    {
        return nullptr;
    }
    return proto;
}

JSObject*
WeakSetObject::initRealmClass(JSContext* cx, JSObject* obj,HandleObject realm)
{
    Rooted<GlobalObject*> global(cx, &obj->as<GlobalObject>());
    RootedPlainObject proto(cx, NewBuiltinClassInstance<PlainObject>(cx));
    if (!proto)
        return nullptr;

    Rooted<JSFunction*> ctor(cx, global->createConstructor(cx, realmConstruct, ClassName(JSProto_WeakSet, cx), 0,gc::AllocKind::FUNCTION_EXTENDED));
    ctor->setExtendedSlot(0,ObjectValue(*realm));

    if (!ctor ||
        !LinkConstructorAndPrototype(cx, ctor, proto) ||
        !DefinePropertiesAndFunctions(cx, proto, properties, methods))
    {
        return nullptr;
    }

    JS_DefineProperty(cx, realm, "WeakSet", ctor,JSPROP_RESOLVING);

    return proto;
}

WeakSetObject*
WeakSetObject::create(JSContext* cx)
{
    Rooted<WeakSetObject*> obj(cx, NewBuiltinClassInstance<WeakSetObject>(cx));
    if (!obj)
        return nullptr;

    RootedObject map(cx, JS::NewWeakMapObject(cx));
    if (!map)
        return nullptr;

    obj->setReservedSlot(WEAKSET_MAP_SLOT, ObjectValue(*map));
    return obj;
}

bool
WeakSetObject::construct(JSContext* cx, unsigned argc, Value* vp)
{
    Rooted<WeakSetObject*> obj(cx, WeakSetObject::create(cx));
    if (!obj)
        return false;

    // Based on our "Set" implementation instead of the more general ES6 steps.
    CallArgs args = CallArgsFromVp(argc, vp);

    if (!args.isConstructing()) {
        JS_ReportErrorNumber(cx, GetErrorMessage, nullptr, JSMSG_NOT_FUNCTION, "WeakSet");
        return false;
    }

    if (!args.get(0).isNullOrUndefined()) {
        RootedObject map(cx, &obj->getReservedSlot(WEAKSET_MAP_SLOT).toObject());

        RootedValue adderVal(cx);
        if (!GetProperty(cx, obj, obj, cx->names().add, &adderVal))
            return false;

        if (!IsCallable(adderVal))
            return ReportIsNotFunction(cx, adderVal);

        JSFunction* adder;
        bool isOriginalAdder = IsFunctionObject(adderVal, &adder) &&
                               IsSelfHostedFunctionWithName(adder, cx->names().WeakSet_add);
        RootedValue setVal(cx, ObjectValue(*obj));
        FastInvokeGuard fig(cx, adderVal);
        InvokeArgs& args2 = fig.args();

        JS::ForOfIterator iter(cx);
        if (!iter.init(args[0]))
            return false;

        RootedValue keyVal(cx);
        RootedObject keyObject(cx);
        RootedValue placeholder(cx, BooleanValue(true));
        while (true) {
            bool done;
            if (!iter.next(&keyVal, &done))
                return false;
            if (done)
                break;

            if (isOriginalAdder) {
                if (keyVal.isPrimitive()) {
                    UniquePtr<char[], JS::FreePolicy> bytes =
                        DecompileValueGenerator(cx, JSDVG_SEARCH_STACK, keyVal, nullptr);
                    if (!bytes)
                        return false;
                    JS_ReportErrorNumber(cx, GetErrorMessage, nullptr, JSMSG_NOT_NONNULL_OBJECT, bytes.get());
                    return false;
                }

                keyObject = &keyVal.toObject();
                if (!SetWeakMapEntry(cx, map, keyObject, placeholder))
                    return false;
            } else {
                if (!args2.init(1))
                    return false;

                args2.setCallee(adderVal);
                args2.setThis(setVal);
                args2[0].set(keyVal);

                if (!fig.invoke(cx))
                    return false;
            }
        }
    }

    args.rval().setObject(*obj);
    return true;
}


bool
WeakSetObject::realmConstruct(JSContext* cx, unsigned argc, Value* vp)
{
    // Based on our "Set" implementation instead of the more general ES6 steps.
    CallArgs args = CallArgsFromVp(argc, vp);


    //The realm Object
    RootedValue realm_val(cx,args.callee().as<JSFunction>().getExtendedSlot(0));
    RootedObject realm_obj(cx,&realm_val.toObject());

    //The ctor
    RootedFunction ctor(cx,&args.callee().as<JSFunction>());
    RootedValue proto(cx);
    GetProperty(cx, ctor, ctor, cx->names().prototype,&proto);
    RootedObject proto_obj(cx);
    proto_obj = &proto.toObject();


    Rooted<WeakSetObject*> obj(cx, WeakSetObject::create(cx));
    if (!obj)
        return false;

    if (!args.isConstructing()) {
        JS_ReportErrorNumber(cx, GetErrorMessage, nullptr, JSMSG_NOT_FUNCTION, "WeakSet");
        return false;
    }

    if (!args.get(0).isNullOrUndefined()) {
        RootedObject map(cx, &obj->getReservedSlot(WEAKSET_MAP_SLOT).toObject());

        RootedValue adderVal(cx);
        if (!GetProperty(cx, obj, obj, cx->names().add, &adderVal))
            return false;

        if (!IsCallable(adderVal))
            return ReportIsNotFunction(cx, adderVal);

        JSFunction* adder;
        bool isOriginalAdder = IsFunctionObject(adderVal, &adder) &&
                               IsSelfHostedFunctionWithName(adder, cx->names().WeakSet_add);
        RootedValue setVal(cx, ObjectValue(*obj));
        FastInvokeGuard fig(cx, adderVal);
        InvokeArgs& args2 = fig.args();

        JS::ForOfIterator iter(cx);
        if (!iter.init(args[0]))
            return false;

        RootedValue keyVal(cx);
        RootedObject keyObject(cx);
        RootedValue placeholder(cx, BooleanValue(true));
        while (true) {
            bool done;
            if (!iter.next(&keyVal, &done))
                return false;
            if (done)
                break;

            if (isOriginalAdder) {
                if (keyVal.isPrimitive()) {
                    UniquePtr<char[], JS::FreePolicy> bytes =
                        DecompileValueGenerator(cx, JSDVG_SEARCH_STACK, keyVal, nullptr);
                    if (!bytes)
                        return false;
                    JS_ReportErrorNumber(cx, GetErrorMessage, nullptr, JSMSG_NOT_NONNULL_OBJECT, bytes.get());
                    return false;
                }

                keyObject = &keyVal.toObject();
                if (!SetWeakMapEntry(cx, map, keyObject, placeholder))
                    return false;
            } else {
                if (!args2.init(1))
                    return false;

                args2.setCallee(adderVal);
                args2.setThis(setVal);
                args2[0].set(keyVal);

                if (!fig.invoke(cx))
                    return false;
            }
        }
    }

    //Set realm as reserverd slot on the Map
    JS_SetReservedSlot(obj,0,realm_val);
    //Set prototype in the same way Object.setPrototypeOf on the Map Object
    SetPrototype(cx,obj,proto_obj);

    args.rval().setObject(*obj);
    return true;
}



JSObject*
js::InitWeakSetClass(JSContext* cx, HandleObject obj)
{
    return WeakSetObject::initClass(cx, obj);
}
