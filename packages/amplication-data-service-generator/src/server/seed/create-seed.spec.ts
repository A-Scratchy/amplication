import { builders, namedTypes } from "ast-types";
import { EntityField, EnumDataType } from "../../types";
import {
  createDefaultValue,
  createUserObjectCustomProperties,
  DEFAULT_ADDRESS_LITERAL,
  DEFAULT_BOOLEAN_LITERAL,
  DEFAULT_EMAIL_LITERAL,
  DEFAULT_EMPTY_STRING_LITERAL,
  DEFAULT_NUMBER_LITERAL,
  EMPTY_ARRAY_EXPRESSION,
  NEW_DATE_EXPRESSION,
} from "./create-seed";
import { DEFAULT_USER_ENTITY } from "../user-entity";
import { createEnumMemberName } from "../resource/dto/create-enum-dto";
import { createEnumName } from "../prisma/create-prisma-schema";
import { memberExpression } from "../../util/ast";

const EXAMPLE_ENTITY_FIELD_NAME = "exampleEntityField";
const EXAMPLE_FIELD_BASE: Pick<
  EntityField,
  "id" | "name" | "displayName" | "required" | "searchable"
> = {
  id: "exampleEntityFieldId",
  name: EXAMPLE_ENTITY_FIELD_NAME,
  displayName: "Example Entity Field",
  required: true,
  searchable: false,
};
const EXAMPLE_SINGLE_LINE_TEXT_FIELD: EntityField = {
  ...EXAMPLE_FIELD_BASE,
  dataType: EnumDataType.SingleLineText,
};
const EXAMPLE_OPTION_SET_OPTION = {
  value: "EXAMPLE_OPTION_VALUE",
  label: "EXAMPLE_LABEL",
};
const EXAMPLE_OPTION_SET_FIELD: EntityField = {
  ...EXAMPLE_FIELD_BASE,
  dataType: EnumDataType.OptionSet,
  properties: {
    options: [EXAMPLE_OPTION_SET_OPTION],
  },
};

describe("createUserObjectCustomProperties", () => {
  test("creates custom object properties", () => {
    const userEntity = {
      ...DEFAULT_USER_ENTITY,
      fields: [...DEFAULT_USER_ENTITY.fields, EXAMPLE_SINGLE_LINE_TEXT_FIELD],
    };
    expect(createUserObjectCustomProperties(userEntity)).toEqual([
      builders.objectProperty(
        builders.identifier(EXAMPLE_ENTITY_FIELD_NAME),
        // @ts-ignore
        createDefaultValue(EXAMPLE_SINGLE_LINE_TEXT_FIELD)
      ),
    ]);
  });
});

describe("createDefaultValue", () => {
  const cases: Array<[string, EntityField, namedTypes.Expression | null]> = [
    [
      "SingleLineText",
      EXAMPLE_SINGLE_LINE_TEXT_FIELD,
      DEFAULT_EMPTY_STRING_LITERAL,
    ],
    [
      "MultiLineText",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.MultiLineText,
      },
      DEFAULT_EMPTY_STRING_LITERAL,
    ],
    [
      "Email",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.Email,
      },
      DEFAULT_EMAIL_LITERAL,
    ],
    [
      "WholeNumber",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.WholeNumber,
      },
      DEFAULT_NUMBER_LITERAL,
    ],
    [
      "DateTime",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.DateTime,
      },
      NEW_DATE_EXPRESSION,
    ],
    [
      "DecimalNumber",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.DecimalNumber,
      },
      DEFAULT_NUMBER_LITERAL,
    ],
    [
      "MultiSelectOptionSet",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.MultiSelectOptionSet,
        properties: {
          options: [
            {
              value: "EXAMPLE_VALUE",
              label: "EXAMPLE_LABEL",
            },
          ],
        },
      },
      EMPTY_ARRAY_EXPRESSION,
    ],
    [
      "OptionSet",
      EXAMPLE_OPTION_SET_FIELD,
      memberExpression`${createEnumName(
        EXAMPLE_OPTION_SET_FIELD
      )}.${createEnumMemberName(EXAMPLE_OPTION_SET_OPTION.label)}`,
    ],
    [
      "Boolean",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.Boolean,
      },
      DEFAULT_BOOLEAN_LITERAL,
    ],
    [
      "GeographicLocation",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.GeographicLocation,
      },
      DEFAULT_ADDRESS_LITERAL,
    ],
    [
      "Id",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.Id,
      },
      null,
    ],
    [
      "CreatedAt",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.CreatedAt,
      },
      null,
    ],
    [
      "UpdatedAt",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.UpdatedAt,
      },
      null,
    ],
    [
      "Roles",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.Roles,
      },
      null,
    ],
    [
      "Username",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.Username,
      },
      null,
    ],
    [
      "Password",
      {
        ...EXAMPLE_FIELD_BASE,
        dataType: EnumDataType.Password,
      },
      null,
    ],
  ];
  test.each(cases)("%s", (name, field, expected) => {
    expect(createDefaultValue(field)).toEqual(expected);
  });
});