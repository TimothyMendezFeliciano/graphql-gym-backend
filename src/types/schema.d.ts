// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    hello: string;
  }

  interface IHelloOnQueryArguments {
    name?: string | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    register: boolean | null;
    signIn: boolean | null;
  }

  interface IRegisterOnMutationArguments {
    publicAddress: string;
    email: string;
    firstName: string;
    lastName: string;
    isTrainer: boolean;
    specialty?: string | null;
  }

  interface ISignInOnMutationArguments {
    publicAddress: string;
    signature: string;
  }
}

// tslint:enable
