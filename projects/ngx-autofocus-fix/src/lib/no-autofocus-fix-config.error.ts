export function noAutofocusFixConfigError() {
  const moduleName = 'AutofocusFixModule';
  const configName = 'AutofocusFixConfig';

  throw new Error(`${ moduleName }: Can't inject ${ configName }.

    Option 1: Use .forRoot() when you importing the module:
              Do it in case you import ${ moduleName } to the root module of your application.

    @NgModule({
      ...
      imports: [
        ...
        ${ moduleName }.forRoot(),     <--- new code
      ],
      ...
    })
    export class AppModule {}


    Option 2: Provide ${ configName } manually providing ${ configName }:
              Do it in case you want to provide specific config to the one of your lazy loadable modules.

    @NgModule({
      ...
      providers: [
        ...
        {                                          <--- new code
          provide: ${ configName }                 <---
          useValue: new ${configName}({ ... }),    <---
        },                                         <---
      ],
      ...
    })
    export class AppModule {}
  `);
}
