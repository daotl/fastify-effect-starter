// GENERATED by @edgedb/generate v0.3.3

import { Cardinality, introspect } from "edgedb/dist/reflection/index";
import type { BaseType, BaseTypeSet, TypeSet, Expression } from "./typesystem";
import type { ExpressionKind, OperatorKind } from "edgedb/dist/reflection/index";
export type $expr_Function<El extends BaseType = BaseType, Card extends Cardinality = Cardinality> = Expression<{
    __element__: El;
    __cardinality__: Card;
    __kind__: ExpressionKind.Function;
    __name__: string;
    __args__: (BaseTypeSet | undefined)[];
    __namedargs__: {
        [key: string]: BaseTypeSet;
    };
}>;
export type $expr_Operator<El extends BaseType = BaseType, Card extends Cardinality = Cardinality> = Expression<{
    __element__: El;
    __cardinality__: Card;
    __kind__: ExpressionKind.Operator;
    __name__: string;
    __opkind__: OperatorKind;
    __args__: TypeSet[];
}>;
interface OverloadFuncArgDef {
    typeId: string;
    optional?: boolean;
    setoftype?: boolean;
    variadic?: boolean;
}
interface OverloadFuncDef {
    kind?: string;
    args: OverloadFuncArgDef[];
    namedArgs?: {
        [key: string]: OverloadFuncArgDef;
    };
    returnTypeId: string;
    returnTypemod?: "SetOfType" | "OptionalType";
    preservesOptionality?: boolean;
}
export declare function $resolveOverload(funcName: string, args: any[], typeSpec: introspect.Types, funcDefs: OverloadFuncDef[]): {
    kind?: string | undefined;
    returnType: BaseType;
    cardinality: Cardinality;
    args: BaseTypeSet[];
    namedArgs: {
        [key: string]: BaseTypeSet;
    };
};
export {};
