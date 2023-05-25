import { useState } from 'react';
import type { Field, RuleGroupType } from 'react-querybuilder';
import { formatQuery, QueryBuilder } from 'react-querybuilder';
import './styles.scss';

const fields: Field[] = [
  { name: 'length', label: 'length' },
  { name: 'Weight', label: 'Weight' },
  { name: 'Width', label: 'Width' },
  { name: 'Heigh', label: 'Heigh' },
  { name: 'Qty', label: 'Qty' },
  { name: 'PackgeType', label: 'PackgeType' },
];

const initialQuery: RuleGroupType = {
  combinator: 'and',
  rules: [{ field: 'length', operator: '<', value: 10 }],
};

export const App = () => {
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState(initialQuery);

  const handleChange = event => {
    setMessage(event.target.value);

    var j = JSON.parse(event.target.value);
    var q = j.result.query;
    console.log('results is:', q);

    setQuery(q);
  };

  const query2 = {
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
        not: false,
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
        not: false,
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
        not: false,
      },
    ],
    combinator: 'or',
    not: false,
  };
  const sqlWhere = formatQuery(query2, 'sql');
  console.log(sqlWhere);

  return (
    <div>
      <div>
        <div>
          <div>
            <label>Enter value : </label>
            <textarea onChange={handleChange} />
          </div>
        </div>
      </div>

      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={q => setQuery(q)}
      />

      <h4>Query</h4>
      <pre>
        <code>{formatQuery(query, 'cel')}</code>
      </pre>
    </div>
  );
};
