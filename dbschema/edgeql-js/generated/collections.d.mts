import { typeutil } from "edgedb/dist/reflection/index.js";
import { cardutil } from "./cardinality.mjs";
import type { $expr_Array, $expr_NamedTuple, $expr_Tuple, ArrayType, BaseType, getPrimitiveBaseType, NamedTupleShape, NamedTupleType, NonArrayType, TupleType, TypeSet } from "./typesystem.mjs";
import { ExpressionRoot } from "./path.mjs";
import type { getCardsFromExprs } from "./set.mjs";
import { literalToScalarType, mapLiteralToTypeSet, orScalarLiteral, scalarLiterals } from "./castMaps.mjs";
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
