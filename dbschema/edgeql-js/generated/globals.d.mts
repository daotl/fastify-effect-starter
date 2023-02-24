import { ExpressionKind, Cardinality } from "edgedb/dist/reflection/index.js";
import type { Expression, BaseType } from "./typesystem.mjs";
export declare function makeGlobal<Type extends BaseType, Card extends Cardinality>(name: string, type: Type, card: Card): $expr_Global<Type, Card>;
export type $expr_Global<Type extends BaseType = BaseType, Card extends Cardinality = Cardinality> = Expression<{
    __name__: string;
    __element__: Type;
    __cardinality__: Card;
    __kind__: ExpressionKind.Global;
}>;
