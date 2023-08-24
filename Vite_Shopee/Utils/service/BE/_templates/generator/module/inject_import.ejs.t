---
inject: true
to: apps/api/src/app.module.ts
after: "const ImportModules = \\["
skip_if: <%= h.changeCase.pascal(Name) %>Module
---
  <%= h.changeCase.pascal(Name) %>Module,