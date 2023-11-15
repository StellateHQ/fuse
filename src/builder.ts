// Pothos features
import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";
import DataloaderPlugin from "@pothos/plugin-dataloader";
import { YogaServerOptions } from "graphql-yoga";

let builder = new SchemaBuilder({
  plugins: [RelayPlugin, DataloaderPlugin],
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
  },
});

let version = 1;
// @ts-ignore
builder.version = version;

export const resetBuilder = () => {
  console.log("resetting");
  builder = new SchemaBuilder({
    plugins: [RelayPlugin, DataloaderPlugin],
    relayOptions: {
      clientMutationId: "omit",
      cursorType: "String",
    },
  });

  // @ts-ignore
  builder.version = version++;
  // Initialize base-types
  builder.queryType({
    fields: (t) => ({
      _version: t.string({
        resolve: () => "0.0.1",
      }),
    }),
  });

  builder.mutationType({
    fields: (t) => ({
      _version: t.string({
        resolve: () => "0.0.1",
      }),
    }),
  });
};

// Initialize base-types
builder.queryType({
  fields: (t) => ({
    _version: t.string({
      resolve: () => "0.0.1",
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    _version: t.string({
      resolve: () => "0.0.1",
    }),
  }),
});

export type GetContext<
  ServerOptions extends Record<string, any> = {},
  UserOptions extends Record<string, any> = {},
> = NonNullable<YogaServerOptions<ServerOptions, UserOptions>["context"]>;
export { createRestDatasource } from "./datasources/rest";
export { builder };
