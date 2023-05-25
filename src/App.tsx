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

const sampleAPIResponse: string =
  '{"result":{"query":{"rules":[{"rules":[{"field":"Items.Height","operator":">=","value":"400","propertyDataType":"decimal","valueDataType":"decimal","order":0,"combinator":null,"not":null},{"field":"Items.Height","operator":"<","value":"500","propertyDataType":"decimal","valueDataType":"decimal","order":1}],"combinator":"and"},{"rules":[{"field":"Items.Width","operator":">=","value":"400","propertyDataType":"decimal","valueDataType":"decimal","order":0},{"field":"Items.Width","operator":"<","value":"500","propertyDataType":"decimal","valueDataType":"decimal","order":1}],"combinator":"and"},{"rules":[{"field":"Items.Length","operator":">=","value":"400","propertyDataType":"decimal","valueDataType":"decimal","order":0},{"field":"Items.Length","operator":"<","value":"500","propertyDataType":"decimal","valueDataType":"decimal","order":1}],"combinator":"and"}],"combinator":"or"},"carrierCode":null,"carrierAccountId":10,"serviceId":53,"additionalServiceId":null},"targetUrl":null,"success":true,"error":null,"unAuthorizedRequest":false,"__abp":true}';

export const App = () => {
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState(initialQuery);

  var j = JSON.parse(sampleAPIResponse);
  query = j.result.query;

  const handleChange = event => {
    setMessage(event.target.value);

    var j = JSON.parse(event.target.value);
    var q = j.result.query;
    console.log('results is:', q);

    setQuery(q);
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <label>Add API response : </label>
            <br />
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
