import type Subject from './Subject';
import Observer from './Observer';
import type { Options } from '../types/type';
import type { Plugin } from 'rollup';

export default class HandlerSubject implements Subject {
  private observers: Observer[] = [];
  private plugins: Plugin[] = [];

  constructor(private options: Options) {}

  attach(observer: Observer): void {
    if (this.observers.includes(observer)) return;
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index === -1) return;
    this.observers.splice(index, 1);
  }

  notifyUpdate(): void {
    this.observers.map((o) => o.update({ options: this.options, plugins: this.plugins }));
  }
  notifyDestroy() {
    this.observers.forEach((o) => o.destroy(this.options));
  }

  getPlugins() {
    return this.plugins;
  }
}
