---
inject: true
to: apps/api/src/app.module.ts
before: "// End Import Modules"
---
import { <%= h.changeCase.pascal(Name) %>Module } from '@<%= type %>/<%= name %>/<%= name %>.module';