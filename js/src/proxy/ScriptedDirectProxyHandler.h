/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 4 -*-
 * vim: set ts=8 sts=4 et sw=4 tw=99:
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef proxy_ScriptedDirectProxyHandler_h
#define proxy_ScriptedDirectProxyHandler_h

#include "js/Proxy.h"
#include "Proxy.h"
#include "builtin/WeakSetObject.h"

namespace js {

/* Derived class for all scripted direct proxy handlers. */
class ScriptedDirectProxyHandler : public BaseProxyHandler {
  public:
    MOZ_CONSTEXPR ScriptedDirectProxyHandler()
      : BaseProxyHandler(&family)
    { }

    /* Standard internal methods. */
    virtual bool getOwnPropertyDescriptor(JSContext* cx, HandleObject proxy, HandleId id,
                                          MutableHandle<JSPropertyDescriptor> desc) const override;
    virtual bool defineProperty(JSContext* cx, HandleObject proxy, HandleId id,
                                Handle<JSPropertyDescriptor> desc,
                                ObjectOpResult& result) const override;
    virtual bool ownPropertyKeys(JSContext* cx, HandleObject proxy,
                                 AutoIdVector& props) const override;
    virtual bool delete_(JSContext* cx, HandleObject proxy, HandleId id,
                         ObjectOpResult& result) const override;
    virtual bool enumerate(JSContext* cx, HandleObject proxy, MutableHandleObject objp) const override;

    /* These two are standard internal methods but aren't implemented to spec yet. */
    virtual bool getPrototype(JSContext* cx, HandleObject proxy,
                              MutableHandleObject protop) const override;
    virtual bool setPrototype(JSContext* cx, HandleObject proxy, HandleObject proto,
                              ObjectOpResult& result) const override;
    /* Non-standard, but needed to handle revoked proxies. */
    virtual bool setImmutablePrototype(JSContext* cx, HandleObject proxy,
                                       bool* succeeded) const override;

    virtual bool preventExtensions(JSContext* cx, HandleObject proxy,
                                   ObjectOpResult& result) const override;
    virtual bool isExtensible(JSContext* cx, HandleObject proxy, bool* extensible) const override;

    virtual bool has(JSContext* cx, HandleObject proxy, HandleId id, bool* bp) const override;
    virtual bool get(JSContext* cx, HandleObject proxy, HandleObject receiver, HandleId id,
                     MutableHandleValue vp) const override;
    virtual bool set(JSContext* cx, HandleObject proxy, HandleId id, HandleValue v,
                     HandleValue receiver, ObjectOpResult& result) const override;
    virtual bool call(JSContext* cx, HandleObject proxy, const CallArgs& args) const override;
    virtual bool construct(JSContext* cx, HandleObject proxy, const CallArgs& args) const override;

    /* SpiderMonkey extensions. */
    virtual bool hasOwn(JSContext* cx, HandleObject proxy, HandleId id, bool* bp) const override {
        return BaseProxyHandler::hasOwn(cx, proxy, id, bp);
    }


    // Kick getOwnEnumerablePropertyKeys out to ownPropertyKeys and then
    // filter. [[GetOwnProperty]] could potentially change the enumerability of
    // the target's properties.
    virtual bool getOwnEnumerablePropertyKeys(JSContext* cx, HandleObject proxy,
                                              AutoIdVector& props) const override {
        return BaseProxyHandler::getOwnEnumerablePropertyKeys(cx, proxy, props);
    }

    // A scripted proxy should not be treated as generic in most contexts.
    virtual bool nativeCall(JSContext* cx, IsAcceptableThis test, NativeImpl impl,
                            CallArgs args) const override;
    virtual bool hasInstance(JSContext* cx, HandleObject proxy, MutableHandleValue v,
                             bool* bp) const override;
    virtual bool objectClassIs(HandleObject obj, ESClassValue classValue,
                               JSContext* cx) const override;
    virtual const char* className(JSContext* cx, HandleObject proxy) const override;
    virtual JSString* fun_toString(JSContext* cx, HandleObject proxy,
                                   unsigned indent) const override;
    virtual bool regexp_toShared(JSContext* cx, HandleObject proxy,
                                 RegExpGuard* g) const override;
    virtual bool boxedValue_unbox(JSContext* cx, HandleObject proxy,
                                  MutableHandleValue vp) const override;

    virtual bool isCallable(JSObject* obj) const override;
    virtual bool isConstructor(JSObject* obj) const override;

    virtual bool isScripted() const override { return true; }

    static const char family;
    static const ScriptedDirectProxyHandler singleton;

    // The "proxy extra" slot index in which the handler is stored. Revocable proxies need to set
    // this at revocation time.
    static const int HANDLER_EXTRA = 0;
    static const int IS_CALLCONSTRUCT_EXTRA = 1;
    // Bitmasks for the "call/construct" slot
    static const int IS_CALLABLE    = 1 << 0;
    static const int IS_CONSTRUCTOR = 1 << 1;
    // The "function extended" slot index in which the revocation object is stored. Per spec, this
    // is to be cleared during the first revocation.
    static const int REVOKE_SLOT = 0;
};

bool
proxy(JSContext* cx, unsigned argc, Value* vp);

bool
tProxy(JSContext* cx, unsigned argc, Value* vp);

bool
proxy_revocable(JSContext* cx, unsigned argc, Value* vp);

bool
ConstructorFunctionByUser(JSContext* cx,unsigned argc,Value* vp);

bool
object_method(JSContext* cx,unsigned argc,Value* vp);

bool
CreateTransparentProxy(JSContext* cx, unsigned argc, Value* vp);

bool
equals(JSContext* cx, unsigned argc, Value* vp);

bool
CreateRealm(JSContext* cx, unsigned argc, Value* vp);

bool
realm_capability_equals(JSContext *cx, JSObject *lhs, JSObject *rhs, JSObject *secret, MutableHandleValue res);

bool
realm_equals(JSContext* cx,unsigned argc,Value* vp);

bool
realm_identical(JSContext* cx,unsigned argc,Value* vp);

bool
identical(JSContext* cx, unsigned argc, Value* vp);

bool
CreateRealmMap(JSContext* cx,unsigned argc,Value* vp);

bool
CreateRealmSet(JSContext* cx,unsigned argc,Value* vp);

bool
CreateRealmWeakMap(JSContext* cx,unsigned argc,Value* vp);

bool
CreateRealmWeakSet(JSContext* cx,unsigned argc,Value* vp);






} /* namespace js */

#endif /* proxy_ScriptedDirectProxyHandler_h */
