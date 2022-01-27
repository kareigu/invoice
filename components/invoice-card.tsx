import { FC } from 'react';
import { IInvoice } from '../utils/types';
import { Card, Typography } from 'antd';

const { Text } = Typography;

interface IProps {
  invoice: IInvoice,
}

const InvoiceCard: FC<IProps> = ({invoice}) => {
  return (
    <Card title={invoice.name}>
      <ul>
        <li>
          <Text code>{ invoice.account }</Text>
        </li>
      </ul>
    </Card>
  )
}

export default InvoiceCard;