import React from "react";

export class ClassInjector {
  protected _isDirty = true;
  protected _className = '';
  classesMap = new Map<string, string | undefined>();
  cache = new Set<string>();

  ref: React.RefObject<HTMLElement>;

  constructor(ref: React.RefObject<HTMLElement>) {
    this.ref = ref;
  }

  withClassName(tag: string, className?: string) {
    const old = this.classesMap.get(tag);
    if (old !== className) {
      old?.split(' ').forEach(cls => this.cache.delete(cls));
      className?.split(' ').forEach(cls => this.cache.add(cls));
      this.classesMap.set(tag, className);

      this._isDirty = true;
    }
  }

  with(className: string, enabled: boolean) {
    if (enabled !== this.cache.has(className)) {
      if (enabled) this.cache.add(className);
      else this.cache.delete(className);

      this._isDirty = true;
    }
  }

  add(className: string) {
    if (!this.cache.has(className)) {
      this.cache.add(className);
      this.ref.current!.classList.add(className);
      this._isDirty = true;
    }
  }

  remove(className: string) {
    if (this.cache.delete(className)) {
      this.ref.current?.classList.remove(className);
      this._isDirty = true;
    }
  }

  has(className: string) {
    return this.cache.has(className);
  }

  toClassName() {
    if (this._isDirty) {
      this._isDirty = false;
      this._className = Array.from(this.cache).join(' ');
    }
    return this._className;
  }
};

export function useClassInjector(ref: React.RefObject<HTMLElement>) {
  const injector = React.useMemo(() => { return new ClassInjector(ref); }, [ref]);
  return injector;
}
