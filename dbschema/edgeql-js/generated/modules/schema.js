// GENERATED by @edgedb/generate v0.1.0
// Run 'npx @edgedb/generate edgeql-js' to re-generate

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
const $ = __importStar(require("../reflection"));
const _ = __importStar(require("../imports"));
const AccessKind = $.makeType(_.spec, "b51757d9-eb7c-11ed-ad57-cf3574c8105b", _.syntax.literal);

const AccessPolicyAction = $.makeType(_.spec, "b516a41f-eb7c-11ed-8b23-85ef399557b9", _.syntax.literal);

const Cardinality = $.makeType(_.spec, "b511a392-eb7c-11ed-add8-950f98314386", _.syntax.literal);

const MigrationGeneratedBy = $.makeType(_.spec, "b51afaf0-eb7c-11ed-a4de-e1bc90507ff4", _.syntax.literal);

const OperatorKind = $.makeType(_.spec, "b513d124-eb7c-11ed-a731-076711593ca0", _.syntax.literal);

const ParameterKind = $.makeType(_.spec, "b51537b8-eb7c-11ed-a2f7-9d957a34aff5", _.syntax.literal);

const RewriteKind = $.makeType(_.spec, "b51a47e3-eb7c-11ed-93f0-452fc7aa47ab", _.syntax.literal);

const SourceDeleteAction = $.makeType(_.spec, "b513169b-eb7c-11ed-b79d-c1bbea937786", _.syntax.literal);

const TargetDeleteAction = $.makeType(_.spec, "b51262b8-eb7c-11ed-8215-df20efc2eb4d", _.syntax.literal);

const TriggerKind = $.makeType(_.spec, "b518e1f9-eb7c-11ed-971c-6d7decc53504", _.syntax.literal);

const TriggerScope = $.makeType(_.spec, "b5199594-eb7c-11ed-a55b-034100fbdec2", _.syntax.literal);

const TriggerTiming = $.makeType(_.spec, "b5180a2c-eb7c-11ed-bb75-4d4a31a8a914", _.syntax.literal);

const TypeModifier = $.makeType(_.spec, "b515ebe6-eb7c-11ed-8a19-fd54be1af75f", _.syntax.literal);

const Volatility = $.makeType(_.spec, "b51483d0-eb7c-11ed-b556-1d60def8fa64", _.syntax.literal);

const $Object_b51be0c9eb7c11ed94a0f94f79d11149 = $.makeType(_.spec, "b51be0c9-eb7c-11ed-94a0-f94f79d11149", _.syntax.literal);

const Object_b51be0c9eb7c11ed94a0f94f79d11149= _.syntax.$PathNode($.$toSet($Object_b51be0c9eb7c11ed94a0f94f79d11149, $.Cardinality.Many), null);

const $SubclassableObject = $.makeType(_.spec, "b5277932-eb7c-11ed-b081-bb307d53a022", _.syntax.literal);

const SubclassableObject= _.syntax.$PathNode($.$toSet($SubclassableObject, $.Cardinality.Many), null);

const $InheritingObject = $.makeType(_.spec, "b6edff32-eb7c-11ed-80e7-39a1179a369b", _.syntax.literal);

const InheritingObject= _.syntax.$PathNode($.$toSet($InheritingObject, $.Cardinality.Many), null);

const $AnnotationSubject = $.makeType(_.spec, "b6c16067-eb7c-11ed-aba2-bf6986e96a88", _.syntax.literal);

const AnnotationSubject= _.syntax.$PathNode($.$toSet($AnnotationSubject, $.Cardinality.Many), null);

const $AccessPolicy = $.makeType(_.spec, "b8473f1e-eb7c-11ed-977f-ef638e39ab8a", _.syntax.literal);

const AccessPolicy= _.syntax.$PathNode($.$toSet($AccessPolicy, $.Cardinality.Many), null);

const $Alias = $.makeType(_.spec, "b8ddd8ae-eb7c-11ed-b4ae-edebb5205320", _.syntax.literal);

const Alias= _.syntax.$PathNode($.$toSet($Alias, $.Cardinality.Many), null);

const $Annotation = $.makeType(_.spec, "b6cf85d8-eb7c-11ed-88b4-83cf34f23ed9", _.syntax.literal);

const Annotation= _.syntax.$PathNode($.$toSet($Annotation, $.Cardinality.Many), null);

const $Type = $.makeType(_.spec, "b53972bc-eb7c-11ed-a84e-d36c131d1aa6", _.syntax.literal);

const Type= _.syntax.$PathNode($.$toSet($Type, $.Cardinality.Many), null);

const $PrimitiveType = $.makeType(_.spec, "b5b9ac41-eb7c-11ed-afd3-a7f0324061c5", _.syntax.literal);

const PrimitiveType= _.syntax.$PathNode($.$toSet($PrimitiveType, $.Cardinality.Many), null);

const $CollectionType = $.makeType(_.spec, "b5d0af82-eb7c-11ed-9efd-9da6df668ac8", _.syntax.literal);

const CollectionType= _.syntax.$PathNode($.$toSet($CollectionType, $.Cardinality.Many), null);

const $Array = $.makeType(_.spec, "b5e87c2f-eb7c-11ed-b645-fd3bde59cf9c", _.syntax.literal);

const Array= _.syntax.$PathNode($.$toSet($Array, $.Cardinality.Many), null);

const $ArrayExprAlias = $.makeType(_.spec, "b605ad8f-eb7c-11ed-8017-330775cec687", _.syntax.literal);

const ArrayExprAlias= _.syntax.$PathNode($.$toSet($ArrayExprAlias, $.Cardinality.Many), null);

const $CallableObject = $.makeType(_.spec, "b7242eb4-eb7c-11ed-bb13-d75bbba76e04", _.syntax.literal);

const CallableObject= _.syntax.$PathNode($.$toSet($CallableObject, $.Cardinality.Many), null);

const $VolatilitySubject = $.makeType(_.spec, "b7440f89-eb7c-11ed-baa7-933ac57ebcbb", _.syntax.literal);

const VolatilitySubject= _.syntax.$PathNode($.$toSet($VolatilitySubject, $.Cardinality.Many), null);

const $Cast = $.makeType(_.spec, "bc6c4048-eb7c-11ed-bda0-9f7024aaebb9", _.syntax.literal);

const Cast= _.syntax.$PathNode($.$toSet($Cast, $.Cardinality.Many), null);

const $ConsistencySubject = $.makeType(_.spec, "b78ec677-eb7c-11ed-8fb9-e106fa7cccb5", _.syntax.literal);

const ConsistencySubject= _.syntax.$PathNode($.$toSet($ConsistencySubject, $.Cardinality.Many), null);

const $Constraint = $.makeType(_.spec, "b754b17c-eb7c-11ed-9d64-59087a621005", _.syntax.literal);

const Constraint= _.syntax.$PathNode($.$toSet($Constraint, $.Cardinality.Many), null);

const $Delta = $.makeType(_.spec, "b6b010de-eb7c-11ed-8b1c-93854cb9641b", _.syntax.literal);

const Delta= _.syntax.$PathNode($.$toSet($Delta, $.Cardinality.Many), null);

const $Extension = $.makeType(_.spec, "bcc435f2-eb7c-11ed-93d2-13231215b217", _.syntax.literal);

const Extension= _.syntax.$PathNode($.$toSet($Extension, $.Cardinality.Many), null);

const $Function = $.makeType(_.spec, "bc024349-eb7c-11ed-8424-291c32b7dc9b", _.syntax.literal);

const Function= _.syntax.$PathNode($.$toSet($Function, $.Cardinality.Many), null);

const $FutureBehavior = $.makeType(_.spec, "bce743ca-eb7c-11ed-b241-2f4032749173", _.syntax.literal);

const FutureBehavior= _.syntax.$PathNode($.$toSet($FutureBehavior, $.Cardinality.Many), null);

const $Global = $.makeType(_.spec, "bbd7afb5-eb7c-11ed-9c9e-dff1c8df5980", _.syntax.literal);

const Global= _.syntax.$PathNode($.$toSet($Global, $.Cardinality.Many), null);

const $Index = $.makeType(_.spec, "b7be4e42-eb7c-11ed-9de0-351f540e85ba", _.syntax.literal);

const Index= _.syntax.$PathNode($.$toSet($Index, $.Cardinality.Many), null);

const $Pointer = $.makeType(_.spec, "b80b7e68-eb7c-11ed-876a-159ec7498054", _.syntax.literal);

const Pointer= _.syntax.$PathNode($.$toSet($Pointer, $.Cardinality.Many), null);

const $Source = $.makeType(_.spec, "b7f21a59-eb7c-11ed-89d7-312120525a09", _.syntax.literal);

const Source= _.syntax.$PathNode($.$toSet($Source, $.Cardinality.Many), null);

const $Link = $.makeType(_.spec, "ba7b6738-eb7c-11ed-a73f-25a6eeec9376", _.syntax.literal);

const Link= _.syntax.$PathNode($.$toSet($Link, $.Cardinality.Many), null);

const $Migration = $.makeType(_.spec, "bc9bdd6f-eb7c-11ed-98c0-19f5cbd3504f", _.syntax.literal);

const Migration= _.syntax.$PathNode($.$toSet($Migration, $.Cardinality.Many), null);

const $Module = $.makeType(_.spec, "b5ace4b0-eb7c-11ed-9b8b-4f2f5df7e8f9", _.syntax.literal);

const Module= _.syntax.$PathNode($.$toSet($Module, $.Cardinality.Many), null);

const $ObjectType = $.makeType(_.spec, "b9485076-eb7c-11ed-ae2c-01fd2227dfb3", _.syntax.literal);

const ObjectType= _.syntax.$PathNode($.$toSet($ObjectType, $.Cardinality.Many), null);

const $Operator = $.makeType(_.spec, "bc391906-eb7c-11ed-ac09-8131cf1e1cea", _.syntax.literal);

const Operator= _.syntax.$PathNode($.$toSet($Operator, $.Cardinality.Many), null);

const $Parameter = $.makeType(_.spec, "b70dc5ed-eb7c-11ed-abc9-b525a41bd1b2", _.syntax.literal);

const Parameter= _.syntax.$PathNode($.$toSet($Parameter, $.Cardinality.Many), null);

const $Property = $.makeType(_.spec, "bb2b32bb-eb7c-11ed-a742-b7d131a5cf56", _.syntax.literal);

const Property= _.syntax.$PathNode($.$toSet($Property, $.Cardinality.Many), null);

const $PseudoType = $.makeType(_.spec, "b54b784a-eb7c-11ed-8851-d59f327a37bd", _.syntax.literal);

const PseudoType= _.syntax.$PathNode($.$toSet($PseudoType, $.Cardinality.Many), null);

const $Range = $.makeType(_.spec, "b673979b-eb7c-11ed-b1ec-d50e141eeb59", _.syntax.literal);

const Range= _.syntax.$PathNode($.$toSet($Range, $.Cardinality.Many), null);

const $RangeExprAlias = $.makeType(_.spec, "b691cd6a-eb7c-11ed-aa99-bdad3e70833c", _.syntax.literal);

const RangeExprAlias= _.syntax.$PathNode($.$toSet($RangeExprAlias, $.Cardinality.Many), null);

const $Rewrite = $.makeType(_.spec, "b8a3481c-eb7c-11ed-8eab-1d207f37ae54", _.syntax.literal);

const Rewrite= _.syntax.$PathNode($.$toSet($Rewrite, $.Cardinality.Many), null);

const $ScalarType = $.makeType(_.spec, "b8fd788f-eb7c-11ed-bc38-6f4af72a6209", _.syntax.literal);

const ScalarType= _.syntax.$PathNode($.$toSet($ScalarType, $.Cardinality.Many), null);

const $Trigger = $.makeType(_.spec, "b8748e7a-eb7c-11ed-be05-5bd80f23c7b0", _.syntax.literal);

const Trigger= _.syntax.$PathNode($.$toSet($Trigger, $.Cardinality.Many), null);

const $Tuple = $.makeType(_.spec, "b62def81-eb7c-11ed-992a-81e0117af480", _.syntax.literal);

const Tuple= _.syntax.$PathNode($.$toSet($Tuple, $.Cardinality.Many), null);

const $TupleElement = $.makeType(_.spec, "b622c0f3-eb7c-11ed-9535-bb2759e5018e", _.syntax.literal);

const TupleElement= _.syntax.$PathNode($.$toSet($TupleElement, $.Cardinality.Many), null);

const $TupleExprAlias = $.makeType(_.spec, "b64f8a80-eb7c-11ed-94a1-57daa19392b8", _.syntax.literal);

const TupleExprAlias= _.syntax.$PathNode($.$toSet($TupleExprAlias, $.Cardinality.Many), null);



Object.assign(exports, { AccessKind: AccessKind, AccessPolicyAction: AccessPolicyAction, Cardinality: Cardinality, MigrationGeneratedBy: MigrationGeneratedBy, OperatorKind: OperatorKind, ParameterKind: ParameterKind, RewriteKind: RewriteKind, SourceDeleteAction: SourceDeleteAction, TargetDeleteAction: TargetDeleteAction, TriggerKind: TriggerKind, TriggerScope: TriggerScope, TriggerTiming: TriggerTiming, TypeModifier: TypeModifier, Volatility: Volatility, $Object_b51be0c9eb7c11ed94a0f94f79d11149: $Object_b51be0c9eb7c11ed94a0f94f79d11149, Object_b51be0c9eb7c11ed94a0f94f79d11149: Object_b51be0c9eb7c11ed94a0f94f79d11149, $SubclassableObject: $SubclassableObject, SubclassableObject: SubclassableObject, $InheritingObject: $InheritingObject, InheritingObject: InheritingObject, $AnnotationSubject: $AnnotationSubject, AnnotationSubject: AnnotationSubject, $AccessPolicy: $AccessPolicy, AccessPolicy: AccessPolicy, $Alias: $Alias, Alias: Alias, $Annotation: $Annotation, Annotation: Annotation, $Type: $Type, Type: Type, $PrimitiveType: $PrimitiveType, PrimitiveType: PrimitiveType, $CollectionType: $CollectionType, CollectionType: CollectionType, $Array: $Array, Array: Array, $ArrayExprAlias: $ArrayExprAlias, ArrayExprAlias: ArrayExprAlias, $CallableObject: $CallableObject, CallableObject: CallableObject, $VolatilitySubject: $VolatilitySubject, VolatilitySubject: VolatilitySubject, $Cast: $Cast, Cast: Cast, $ConsistencySubject: $ConsistencySubject, ConsistencySubject: ConsistencySubject, $Constraint: $Constraint, Constraint: Constraint, $Delta: $Delta, Delta: Delta, $Extension: $Extension, Extension: Extension, $Function: $Function, Function: Function, $FutureBehavior: $FutureBehavior, FutureBehavior: FutureBehavior, $Global: $Global, Global: Global, $Index: $Index, Index: Index, $Pointer: $Pointer, Pointer: Pointer, $Source: $Source, Source: Source, $Link: $Link, Link: Link, $Migration: $Migration, Migration: Migration, $Module: $Module, Module: Module, $ObjectType: $ObjectType, ObjectType: ObjectType, $Operator: $Operator, Operator: Operator, $Parameter: $Parameter, Parameter: Parameter, $Property: $Property, Property: Property, $PseudoType: $PseudoType, PseudoType: PseudoType, $Range: $Range, Range: Range, $RangeExprAlias: $RangeExprAlias, RangeExprAlias: RangeExprAlias, $Rewrite: $Rewrite, Rewrite: Rewrite, $ScalarType: $ScalarType, ScalarType: ScalarType, $Trigger: $Trigger, Trigger: Trigger, $Tuple: $Tuple, Tuple: Tuple, $TupleElement: $TupleElement, TupleElement: TupleElement, $TupleExprAlias: $TupleExprAlias, TupleExprAlias: TupleExprAlias });

const __defaultExports = {
  "AccessKind": AccessKind,
  "AccessPolicyAction": AccessPolicyAction,
  "Cardinality": Cardinality,
  "MigrationGeneratedBy": MigrationGeneratedBy,
  "OperatorKind": OperatorKind,
  "ParameterKind": ParameterKind,
  "RewriteKind": RewriteKind,
  "SourceDeleteAction": SourceDeleteAction,
  "TargetDeleteAction": TargetDeleteAction,
  "TriggerKind": TriggerKind,
  "TriggerScope": TriggerScope,
  "TriggerTiming": TriggerTiming,
  "TypeModifier": TypeModifier,
  "Volatility": Volatility,
  "Object": Object_b51be0c9eb7c11ed94a0f94f79d11149,
  "SubclassableObject": SubclassableObject,
  "InheritingObject": InheritingObject,
  "AnnotationSubject": AnnotationSubject,
  "AccessPolicy": AccessPolicy,
  "Alias": Alias,
  "Annotation": Annotation,
  "Type": Type,
  "PrimitiveType": PrimitiveType,
  "CollectionType": CollectionType,
  "Array": Array,
  "ArrayExprAlias": ArrayExprAlias,
  "CallableObject": CallableObject,
  "VolatilitySubject": VolatilitySubject,
  "Cast": Cast,
  "ConsistencySubject": ConsistencySubject,
  "Constraint": Constraint,
  "Delta": Delta,
  "Extension": Extension,
  "Function": Function,
  "FutureBehavior": FutureBehavior,
  "Global": Global,
  "Index": Index,
  "Pointer": Pointer,
  "Source": Source,
  "Link": Link,
  "Migration": Migration,
  "Module": Module,
  "ObjectType": ObjectType,
  "Operator": Operator,
  "Parameter": Parameter,
  "Property": Property,
  "PseudoType": PseudoType,
  "Range": Range,
  "RangeExprAlias": RangeExprAlias,
  "Rewrite": Rewrite,
  "ScalarType": ScalarType,
  "Trigger": Trigger,
  "Tuple": Tuple,
  "TupleElement": TupleElement,
  "TupleExprAlias": TupleExprAlias
};
exports.default = __defaultExports;
