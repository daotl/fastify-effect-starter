import { ExpressionKind, Cardinality } from "edgedb/dist/reflection/index.js";
import type { BaseType, Expression, TypeSet } from "./typesystem.mjs";
import type { $expr_Select } from "./select.mjs";
import type { $expr_For } from "./for.mjs";
import type { $expr_Insert } from "./insert.mjs";
import type { $expr_Update } from "./update.mjs";
import type { $expr_Group } from "./group.mjs";
export type $expr_Alias<El extends BaseType = BaseType, Card extends Cardinality = Cardinality> = Expression<{
    __element__: El;
    __cardinality__: Card;
    __kind__: ExpressionKind.Alias;
    __expr__: TypeSet;
}>;
export declare function alias<Expr extends Expression>(expr: Expr): $expr_Alias<Expr["__element__"], Expr["__cardinality__"]>;
export type WithableExpression = $expr_Select | $expr_For | $expr_Insert | $expr_Update | $expr_Group;
export type $expr_With<Expr extends WithableExpression = WithableExpression> = Expression<{
    __element__: Expr["__element__"];
    __cardinality__: Expr["__cardinality__"];
    __kind__: ExpressionKind.With;
    __expr__: Expr;
    __refs__: TypeSet[];
}>;
declare function _with<Expr extends WithableExpression>(refs: Expression[], expr: Expr): $expr_With<Expr>;
export { _with as with };
