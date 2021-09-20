import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create the table
    const table = new sst.Table(this, "Counter", {
      fields: {
        counter: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "counter" },
    });

    // Create a Next.js site
    const site = new sst.NextjsSite(this, "Site", {
      path: "site",
      environment: {
        NEXT_PUBLIC_REGION: scope.region,
        NEXT_PUBLIC_TABLE_NAME: table.tableName,
      },
      defaultFunctionProps: {
        permissions: [table],
      }
    });

    // Show the endpoint in the output
    this.addOutputs({
      URL: site.url,
    });
  }
}
