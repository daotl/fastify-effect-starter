// GENERATED by @edgedb/generate v0.3.1
// Run 'npx @edgedb/generate interfaces' to re-generate

import type * as edgedb from "edgedb";
export namespace std {
  export interface BaseObject {
    "id": string;
  }
  export interface $Object extends BaseObject {}
  export interface FreeObject extends BaseObject {}
  export type JsonEmpty = "ReturnEmpty" | "ReturnTarget" | "Error" | "UseNull" | "DeleteKey";
}
export namespace cfg {
  export interface ConfigObject extends std.BaseObject {}
  export interface AbstractConfig extends ConfigObject {
    "session_idle_timeout": edgedb.Duration;
    "session_idle_transaction_timeout": edgedb.Duration;
    "query_execution_timeout": edgedb.Duration;
    "listen_port": number;
    "listen_addresses": string[];
    "auth": Auth[];
    "allow_dml_in_functions"?: boolean | null;
    "allow_bare_ddl"?: AllowBareDDL | null;
    "apply_access_policies"?: boolean | null;
    "allow_user_specified_id"?: boolean | null;
    "shared_buffers"?: edgedb.ConfigMemory | null;
    "query_work_mem"?: edgedb.ConfigMemory | null;
    "effective_cache_size"?: edgedb.ConfigMemory | null;
    "effective_io_concurrency"?: number | null;
    "default_statistics_target"?: number | null;
    "force_database_error"?: string | null;
    "_pg_prepared_statement_cache_size": number;
    "maintenance_work_mem"?: edgedb.ConfigMemory | null;
  }
  export type AllowBareDDL = "AlwaysAllow" | "NeverAllow";
  export interface Auth extends ConfigObject {
    "priority": number;
    "user": string[];
    "method"?: AuthMethod | null;
    "comment"?: string | null;
  }
  export interface AuthMethod extends ConfigObject {
    "transports": ConnectionTransport[];
  }
  export interface Config extends AbstractConfig {}
  export type ConnectionTransport = "TCP" | "TCP_PG" | "HTTP";
  export interface DatabaseConfig extends AbstractConfig {}
  export interface InstanceConfig extends AbstractConfig {}
  export interface JWT extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export interface SCRAM extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export interface Trust extends AuthMethod {}
}
export interface Base extends std.$Object {
  "createdAt": Date;
}
export interface Category extends Base {
  "name"?: string | null;
  "posts": Post[];
}
export interface Group extends Base {
  "name": string;
  "editablePosts": Post[];
  "groupRoles": GroupRole[];
  "members": User[];
  "owner": User;
  "viewablePosts": Post[];
}
export interface GroupRole extends Base {
  "group": Group;
  "code": string;
  "users": User[];
}
export interface Post extends Base {
  "categories": Category[];
  "editorGroups": Group[];
  "viewerGroups": Group[];
  "title": string;
  "content": string;
  "published": boolean;
  "author": User;
  "editors": User[];
  "viewers": User[];
}
export interface Profile extends Base {
  "bio"?: string | null;
  "user": User[];
}
export type Role = "user" | "admin";
export interface User extends Base {
  "profile"?: Profile | null;
  "email": string;
  "name": string;
  "role": Role;
  "groups": Group[];
  "groupRoles": GroupRole[];
  "authoredPosts": Post[];
  "editablePosts": Post[];
  "viewablePosts": Post[];
}
export namespace schema {
  export type AccessKind = "Select" | "UpdateRead" | "UpdateWrite" | "Delete" | "Insert";
  export interface $Object extends std.BaseObject {
    "name": string;
    "internal": boolean;
    "builtin": boolean;
    "computed_fields"?: string[] | null;
  }
  export interface SubclassableObject extends $Object {
    "abstract"?: boolean | null;
    "is_abstract"?: boolean | null;
    "final": boolean;
    "is_final": boolean;
  }
  export interface InheritingObject extends SubclassableObject {
    "bases": InheritingObject[];
    "ancestors": InheritingObject[];
    "inherited_fields"?: string[] | null;
  }
  export interface AnnotationSubject extends $Object {
    "annotations": Annotation[];
  }
  export interface AccessPolicy extends InheritingObject, AnnotationSubject {
    "subject": ObjectType;
    "access_kinds": AccessKind[];
    "condition"?: string | null;
    "action": AccessPolicyAction;
    "expr"?: string | null;
    "errmessage"?: string | null;
  }
  export type AccessPolicyAction = "Allow" | "Deny";
  export interface Alias extends AnnotationSubject {
    "expr": string;
    "type"?: Type | null;
  }
  export interface Annotation extends InheritingObject, AnnotationSubject {
    "inheritable"?: boolean | null;
  }
  export interface Type extends SubclassableObject, AnnotationSubject {
    "expr"?: string | null;
    "from_alias"?: boolean | null;
    "is_from_alias"?: boolean | null;
  }
  export interface PrimitiveType extends Type {}
  export interface CollectionType extends PrimitiveType {}
  export interface Array extends CollectionType {
    "element_type": Type;
    "dimensions"?: number[] | null;
  }
  export interface ArrayExprAlias extends Array {}
  export interface CallableObject extends AnnotationSubject {
    "params": Parameter[];
    "return_type"?: Type | null;
    "return_typemod"?: TypeModifier | null;
  }
  export type Cardinality = "One" | "Many";
  export interface VolatilitySubject extends $Object {
    "volatility"?: Volatility | null;
  }
  export interface Cast extends AnnotationSubject, VolatilitySubject {
    "from_type"?: Type | null;
    "to_type"?: Type | null;
    "allow_implicit"?: boolean | null;
    "allow_assignment"?: boolean | null;
  }
  export interface ConsistencySubject extends InheritingObject, AnnotationSubject {
    "constraints": Constraint[];
  }
  export interface Constraint extends CallableObject, InheritingObject {
    "params": Parameter[];
    "expr"?: string | null;
    "subjectexpr"?: string | null;
    "finalexpr"?: string | null;
    "errmessage"?: string | null;
    "delegated"?: boolean | null;
    "except_expr"?: string | null;
    "subject"?: ConsistencySubject | null;
  }
  export interface Delta extends $Object {
    "parents": Delta[];
  }
  export interface Extension extends AnnotationSubject, $Object {
    "package": sys.ExtensionPackage;
  }
  export interface Function extends CallableObject, VolatilitySubject {
    "preserves_optionality"?: boolean | null;
    "body"?: string | null;
    "language": string;
    "used_globals": Global[];
  }
  export interface FutureBehavior extends $Object {}
  export interface Global extends AnnotationSubject {
    "target"?: Type | null;
    "required"?: boolean | null;
    "cardinality"?: Cardinality | null;
    "expr"?: string | null;
    "default"?: string | null;
  }
  export interface Index extends InheritingObject, AnnotationSubject {
    "expr"?: string | null;
    "except_expr"?: string | null;
    "params": Parameter[];
    "kwargs"?: {name: string, expr: string}[] | null;
  }
  export interface Pointer extends ConsistencySubject, AnnotationSubject {
    "cardinality"?: Cardinality | null;
    "required"?: boolean | null;
    "readonly"?: boolean | null;
    "default"?: string | null;
    "expr"?: string | null;
    "source"?: Source | null;
    "target"?: Type | null;
    "rewrites": Rewrite[];
  }
  export interface Source extends $Object {
    "indexes": Index[];
    "pointers": Pointer[];
  }
  export interface Link extends Pointer, Source {
    "target"?: ObjectType | null;
    "properties": Property[];
    "on_target_delete"?: TargetDeleteAction | null;
    "on_source_delete"?: SourceDeleteAction | null;
  }
  export interface Migration extends AnnotationSubject, $Object {
    "parents": Migration[];
    "script": string;
    "message"?: string | null;
    "generated_by"?: MigrationGeneratedBy | null;
  }
  export type MigrationGeneratedBy = "DevMode" | "DDLStatement";
  export interface Module extends AnnotationSubject, $Object {}
  export interface ObjectType extends Source, ConsistencySubject, InheritingObject, Type, AnnotationSubject {
    "union_of": ObjectType[];
    "intersection_of": ObjectType[];
    "access_policies": AccessPolicy[];
    "triggers": Trigger[];
    "compound_type": boolean;
    "is_compound_type": boolean;
    "links": Link[];
    "properties": Property[];
  }
  export interface Operator extends CallableObject, VolatilitySubject {
    "operator_kind"?: OperatorKind | null;
    "abstract"?: boolean | null;
    "is_abstract"?: boolean | null;
  }
  export type OperatorKind = "Infix" | "Postfix" | "Prefix" | "Ternary";
  export interface Parameter extends $Object {
    "type": Type;
    "typemod": TypeModifier;
    "kind": ParameterKind;
    "num": number;
    "default"?: string | null;
  }
  export type ParameterKind = "VariadicParam" | "NamedOnlyParam" | "PositionalParam";
  export interface Property extends Pointer {}
  export interface PseudoType extends InheritingObject, Type {}
  export interface Range extends CollectionType {
    "element_type": Type;
  }
  export interface RangeExprAlias extends Range {}
  export interface Rewrite extends InheritingObject, AnnotationSubject {
    "subject": Pointer;
    "kind": TriggerKind;
    "expr": string;
  }
  export type RewriteKind = "Update" | "Insert";
  export interface ScalarType extends PrimitiveType, ConsistencySubject, AnnotationSubject {
    "default"?: string | null;
    "enum_values"?: string[] | null;
    "arg_values"?: string[] | null;
  }
  export type SourceDeleteAction = "DeleteTarget" | "Allow" | "DeleteTargetIfOrphan";
  export type TargetDeleteAction = "Restrict" | "DeleteSource" | "Allow" | "DeferredRestrict";
  export interface Trigger extends InheritingObject, AnnotationSubject {
    "subject": ObjectType;
    "timing": TriggerTiming;
    "kinds": TriggerKind[];
    "scope": TriggerScope;
    "expr"?: string | null;
  }
  export type TriggerKind = "Update" | "Delete" | "Insert";
  export type TriggerScope = "All" | "Each";
  export type TriggerTiming = "After" | "AfterCommitOf";
  export interface Tuple extends CollectionType {
    "named": boolean;
    "element_types": TupleElement[];
  }
  export interface TupleElement extends std.BaseObject {
    "type": Type;
    "name"?: string | null;
  }
  export interface TupleExprAlias extends Tuple {}
  export type TypeModifier = "SetOfType" | "OptionalType" | "SingletonType";
  export type Volatility = "Immutable" | "Stable" | "Volatile";
}
export namespace sys {
  export interface SystemObject extends schema.$Object {}
  export interface ExternalObject extends SystemObject {}
  export interface Database extends ExternalObject, schema.AnnotationSubject {
    "name": string;
  }
  export interface ExtensionPackage extends SystemObject, schema.AnnotationSubject {
    "script": string;
    "version": {major: number, minor: number, stage: VersionStage, stage_no: number, local: string[]};
  }
  export interface Role extends SystemObject, schema.InheritingObject, schema.AnnotationSubject {
    "name": string;
    "superuser": boolean;
    "is_superuser": boolean;
    "password"?: string | null;
    "member_of": Role[];
  }
  export type TransactionIsolation = "RepeatableRead" | "Serializable";
  export type VersionStage = "dev" | "alpha" | "beta" | "rc" | "final";
}
export interface types {
  "std": {
    "BaseObject": std.BaseObject;
    "Object": std.$Object;
    "FreeObject": std.FreeObject;
    "JsonEmpty": std.JsonEmpty;
  };
  "cfg": {
    "ConfigObject": cfg.ConfigObject;
    "AbstractConfig": cfg.AbstractConfig;
    "AllowBareDDL": cfg.AllowBareDDL;
    "Auth": cfg.Auth;
    "AuthMethod": cfg.AuthMethod;
    "Config": cfg.Config;
    "ConnectionTransport": cfg.ConnectionTransport;
    "DatabaseConfig": cfg.DatabaseConfig;
    "InstanceConfig": cfg.InstanceConfig;
    "JWT": cfg.JWT;
    "SCRAM": cfg.SCRAM;
    "Trust": cfg.Trust;
  };
  "default": {
    "Base": Base;
    "Category": Category;
    "Group": Group;
    "GroupRole": GroupRole;
    "Post": Post;
    "Profile": Profile;
    "Role": Role;
    "User": User;
  };
  "schema": {
    "AccessKind": schema.AccessKind;
    "Object": schema.$Object;
    "SubclassableObject": schema.SubclassableObject;
    "InheritingObject": schema.InheritingObject;
    "AnnotationSubject": schema.AnnotationSubject;
    "AccessPolicy": schema.AccessPolicy;
    "AccessPolicyAction": schema.AccessPolicyAction;
    "Alias": schema.Alias;
    "Annotation": schema.Annotation;
    "Type": schema.Type;
    "PrimitiveType": schema.PrimitiveType;
    "CollectionType": schema.CollectionType;
    "Array": schema.Array;
    "ArrayExprAlias": schema.ArrayExprAlias;
    "CallableObject": schema.CallableObject;
    "Cardinality": schema.Cardinality;
    "VolatilitySubject": schema.VolatilitySubject;
    "Cast": schema.Cast;
    "ConsistencySubject": schema.ConsistencySubject;
    "Constraint": schema.Constraint;
    "Delta": schema.Delta;
    "Extension": schema.Extension;
    "Function": schema.Function;
    "FutureBehavior": schema.FutureBehavior;
    "Global": schema.Global;
    "Index": schema.Index;
    "Pointer": schema.Pointer;
    "Source": schema.Source;
    "Link": schema.Link;
    "Migration": schema.Migration;
    "MigrationGeneratedBy": schema.MigrationGeneratedBy;
    "Module": schema.Module;
    "ObjectType": schema.ObjectType;
    "Operator": schema.Operator;
    "OperatorKind": schema.OperatorKind;
    "Parameter": schema.Parameter;
    "ParameterKind": schema.ParameterKind;
    "Property": schema.Property;
    "PseudoType": schema.PseudoType;
    "Range": schema.Range;
    "RangeExprAlias": schema.RangeExprAlias;
    "Rewrite": schema.Rewrite;
    "RewriteKind": schema.RewriteKind;
    "ScalarType": schema.ScalarType;
    "SourceDeleteAction": schema.SourceDeleteAction;
    "TargetDeleteAction": schema.TargetDeleteAction;
    "Trigger": schema.Trigger;
    "TriggerKind": schema.TriggerKind;
    "TriggerScope": schema.TriggerScope;
    "TriggerTiming": schema.TriggerTiming;
    "Tuple": schema.Tuple;
    "TupleElement": schema.TupleElement;
    "TupleExprAlias": schema.TupleExprAlias;
    "TypeModifier": schema.TypeModifier;
    "Volatility": schema.Volatility;
  };
  "sys": {
    "SystemObject": sys.SystemObject;
    "ExternalObject": sys.ExternalObject;
    "Database": sys.Database;
    "ExtensionPackage": sys.ExtensionPackage;
    "Role": sys.Role;
    "TransactionIsolation": sys.TransactionIsolation;
    "VersionStage": sys.VersionStage;
  };
}


export namespace helper {
  type LinkType = std.BaseObject | std.BaseObject[];

  export type propertyKeys<T> = {
    [k in keyof T]: NonNullable<T[k]> extends LinkType ? never : k;
  }[keyof T];

  export type linkKeys<T> = {
    [k in keyof T]: NonNullable<T[k]> extends LinkType ? k : never;
  }[keyof T];

  export type Props<T> = Pick<T, propertyKeys<T>>;
  export type Links<T> = Pick<T, linkKeys<T>>;
}
