/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 4 -*-
 * vim: set ts=8 sts=4 et sw=4 tw=99:
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef builtin_WeakSetObject_h
#define builtin_WeakSetObject_h

#include "vm/NativeObject.h"

namespace js {

class WeakSetObject : public NativeObject
{
  public:
    static const unsigned RESERVED_SLOTS = 2;

    static JSObject* initClass(JSContext* cx, JSObject* obj);
    static JSObject* initRealmClass(JSContext* cx, JSObject* obj,HandleObject realm);

    static const Class class_;
    static bool construct(JSContext* cx, unsigned argc, Value* vp);
    static bool realmConstruct(JSContext* cx, unsigned argc, Value* vp);


  private:
    static const JSPropertySpec properties[];
    static const JSFunctionSpec methods[];

    static WeakSetObject* create(JSContext* cx);
    
};

extern JSObject*
InitWeakSetClass(JSContext* cx, HandleObject obj);

} // namespace js

#endif /* builtin_WeakSetObject_h */
