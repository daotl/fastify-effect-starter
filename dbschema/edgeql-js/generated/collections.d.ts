// GENERATED by @edgedb/generate v0.3.1
// Run 'npx @edgedb/generate edgeql-js' to re-generate

import { typeutil } from "edgedb/dist/reflection/index";
import { cardutil } from "./cardinality";
import type { $expr_Array, $expr_NamedTuple, $expr_Tuple, ArrayType, BaseType, getPrimitiveBaseType, NamedTupleShape, NamedTupleType, NonArrayType, ObjectTypeExpression, ObjectTypePointers, PropertyDesc, TupleType, TypeSet } from "./typesystem";
import { ExpressionRoot } from "./path";
import type { getCardsFromExprs } from "./set";
import { literalToScalarType, mapLiteralToTypeSet, orScalarLiteral, scalarLiterals } from "./castMaps";
export declare function $arrayLikeIndexify(_expr: ExpressionRoot): any;
export declare function array<Element extends NonArrayType>(element: Element): ArrayType<Element>;
export declare function array<Expr extends TypeSet<NonArrayType> | scalarLiterals, Exprs extends orScalarLiteral<TypeSet<Expr extends TypeSet ? getPrimitiveBaseType<Expr["__element__"]> : getPrimitiveBaseType<literalToScalarType<Expr>>>>[]>(arg: [Expr, ...Exprs]): $expr_Array<ArrayType<Expr extends TypeSet ? getPrimitiveBaseType<Expr["__element__"]> : getPrimitiveBaseType<literalToScalarType<Expr>>>, cardutil.multiplyCardinalitiesVariadic<getCardsFromExprs<mapLiteralToTypeSet<[Expr, ...Exprs]>>>>;
export declare function $tuplePathify(expr: ExpressionRoot): ExpressionRoot;
export declare function tuple<Items extends typeutil.tupleOf<BaseType>>(items: Items): TupleType<Items>;
export declare function tuple<Item extends TypeSet | scalarLiterals, Items extends typeutil.tupleOf<TypeSet | scalarLiterals>>(items: Items): $expr_Tuple<Items extends typeutil.tupleOf<any> ? mapLiteralToTypeSet<Items> : never>;
export declare function tuple<Shape extends NamedTupleShape>(shape: Shape): NamedTupleType<Shape>;
export declare function tuple<Shape extends {
    [k: string]: TypeSet | scalarLiterals;
}>(shape: Shape): $expr_NamedTuple<mapLiteralToTypeSet<Shape>>;
type PropertyNamesFromPointers<Pointers extends ObjectTypePointers> = {
    [k in keyof Pointers as Pointers[k] extends PropertyDesc ? Pointers[k]["computed"] extends true ? never : k : never]: Pointers[k];
};
export declare function $objectTypeToTupleType<Expr extends ObjectTypeExpression>(objectType: Expr): PropertyNamesFromPointers<Expr["__element__"]["__pointers__"]> extends infer Pointers ? Pointers extends ObjectTypePointers ? NamedTupleType<{
    [k in keyof Pointers as k extends "id" ? never : k]: Pointers[k]["target"];
}> : never : never;
export declare function $objectTypeToTupleType<Expr extends ObjectTypeExpression, Fields extends keyof PropertyNamesFromPointers<Expr["__element__"]["__pointers__"]>>(objectType: Expr, includeFields: Fields[]): NamedTupleType<{
    [k in Fields]: Expr["__element__"]["__pointers__"][k] extends PropertyDesc ? Expr["__element__"]["__pointers__"][k]["target"] : never;
}>;
export {};
