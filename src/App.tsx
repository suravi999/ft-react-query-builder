import { useState } from 'react';
import type { Field, RuleGroupType } from 'react-querybuilder';
import { formatQuery, QueryBuilder } from 'react-querybuilder';
import './styles.scss';

const fields: Field[] = [{ name: "Items.All.Length", label: "Items.All.Length"},
{ name: "ItemOptions.Unusual", label: "ItemOptions.Unusual"},
{ name: "Items.Rotation", label: "Items.Rotation"},
{ name: "Items.PackageType", label: "Items.PackageType"},
{ name: "PickupOptions.TailLift", label: "PickupOptions.TailLift"},
{ name: "Items.All.PackageType", label: "Items.All.PackageType"},
{ name: "Items.All.Width", label: "Items.All.Width"},
{ name: "ItemOptions.Liquid", label: "ItemOptions.Liquid"},
{ name: "Items.Length", label: "Items.Length"},
{ name: "Items..Weight", label: "Items..Weight"},
{ name: "Items.Height", label: "Items.Height"},
{ name: "Items.Weight", label: "Items.Weight"},
{ name: "Items..CubicWeight", label: "Items..CubicWeight"},
{ name: "DeliveryOptions.POBox", label: "DeliveryOptions.POBox"},
{ name: "Items.All.Weight", label: "Items.All.Weight"},
{ name: "Location.ToSuburb", label: "Location.ToSuburb"},
{ name: "Items..Length", label: "Items..Length"},
{ name: "Items..Width", label: "Items..Width"},
{ name: "DeliveryOptions.HandUnload", label: "DeliveryOptions.HandUnload"},
{ name: "Items..Height", label: "Items..Height"},
{ name: "Items.CubicWeight", label: "Items.CubicWeight"},
{ name: "Items.All.Height", label: "Items.All.Height"},
{ name: "Items.Width", label: "Items.Width"},
{ name: "Items.All.CubicWeight", label: "Items.All.CubicWeight"},
{ name: "Items.All.Fragile", label: "Items.All.Fragile"},
{ name: "Location.FromSuburb", label: "Location.FromSuburb"},
{ name: "DeliveryOptions.TailLift", label: "DeliveryOptions.TailLift"},
{ name: "ItemOptions.Fragile", label: "ItemOptions.Fragile"},
{ name: "Items.Height", label: "Items.Height"},
{ name: "DeliveryOptions.TwoMenDelivery", label: "DeliveryOptions.TwoMenDelivery"},
{ name: "Items.All.Liquid", label: "Items.All.Liquid"},
{ name: "Location.ToPostCode", label: "Location.ToPostCode"},
{ name: "Location.FromCountryCode", label: "Location.FromCountryCode"},
{ name: "Items.Diagonal", label: "Items.Diagonal"},
{ name: "PickupOptions.HandLoad", label: "PickupOptions.HandLoad"},
{ name: "Location.ToCountryCode", label: "Location.ToCountryCode"},
{ name: "Location.FromPostCode", label: "Location.FromPostCode"},
];

const initialQuery: RuleGroupType = {
  rules: [
    {
      rules: [
        {
          field: 'Items.Height',
          operator: '>=',
          value: '400',
          propertyDataType: 'decimal',
          valueDataType: 'decimal',
          order: 0,
          combinator: null,
          not: null,
        },
        {
          field: 'Items.Height',
          operator: '<',
          value: '500',
          propertyDataType: 'decimal',
          valueDataType: 'decimal',
          order: 1,
        },
      ],
      combinator: 'and',
    },
    {
      rules: [
        {
          field: 'Items.Width',
          operator: '>=',
          value: '400',
          propertyDataType: 'decimal',
          valueDataType: 'decimal',
          order: 0,
        },
        {
          field: 'Items.Width',
          operator: '<',
          value: '500',
          propertyDataType: 'decimal',
          valueDataType: 'decimal',
          order: 1,
        },
      ],
      combinator: 'and',
    },
    {
      rules: [
        {
          field: 'Items.Length',
          operator: '>=',
          value: '400',
          propertyDataType: 'decimal',
          valueDataType: 'decimal',
          order: 0,
        },
        {
          field: 'Items.Length',
          operator: '<',
          value: '500',
          propertyDataType: 'decimal',
          valueDataType: 'decimal',
          order: 1,
        },
      ],
      combinator: 'and',
    },
  ],
  combinator: 'or',
};

const sampleAPIResponse: string =
  '{"result":{"query":{"rules":[{"rules":[{"field":"Items.Height","operator":">=","value":"400","propertyDataType":"decimal","valueDataType":"decimal","order":0,"combinator":null,"not":null},{"field":"Items.Height","operator":"<","value":"500","propertyDataType":"decimal","valueDataType":"decimal","order":1}],"combinator":"and"},{"rules":[{"field":"Items.Width","operator":">=","value":"400","propertyDataType":"decimal","valueDataType":"decimal","order":0},{"field":"Items.Width","operator":"<","value":"500","propertyDataType":"decimal","valueDataType":"decimal","order":1}],"combinator":"and"},{"rules":[{"field":"Items.Length","operator":">=","value":"400","propertyDataType":"decimal","valueDataType":"decimal","order":0},{"field":"Items.Length","operator":"<","value":"500","propertyDataType":"decimal","valueDataType":"decimal","order":1}],"combinator":"and"}],"combinator":"or"},"carrierCode":null,"carrierAccountId":10,"serviceId":53,"additionalServiceId":null},"targetUrl":null,"success":true,"error":null,"unAuthorizedRequest":false,"__abp":true}';

export const App = () => {
  const [response, setResponse] = useState('');
  const [query, setQuery] = useState(initialQuery);

  //setMessage(sampleAPIResponse);

  const handleChange = event => {
    var j = JSON.parse(event.target.value);
    var q = j.result.query;
    console.log('results is:', q);

    setQuery(q);
  };

  return (
    <div>
      <label>Add API response : </label>
      <br />
      <textarea
        onChange={handleChange}
        defaultValue={sampleAPIResponse}
        style={{ height: 300, width: 700 }}
      />

      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={q => setQuery(q)}
      />

      <h2>Outputs</h2>
      <h4>Query CEL</h4>
      <pre>
        <code>{formatQuery(query, 'cel')}</code>
      </pre>

      <h4>Query JSON</h4>
      <pre>
        <code>{formatQuery(query, 'json')}</code>
      </pre>
    </div>
  );
};
