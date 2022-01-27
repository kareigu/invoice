import { FC } from 'react';
import { IInvoice } from '../utils/types';
import { Button, Card, DatePicker, Input, Typography } from 'antd';
import moment from 'moment'

const { Text } = Typography;

interface IProps {
  invoice: IInvoice,
}

const InvoiceCard: FC<IProps> = ({invoice}) => {
  const date = moment(invoice.date);

  return (
    <Card title={invoice.name}>
      <Input 
        prefix="Payee:"
        style={{marginBottom: 10}} 
        value={invoice.payee}
        readOnly
      />
      <Input 
        prefix="Account:" 
        style={{marginBottom: 10}} 
        value={invoice.account}
        readOnly
      />

      <Input 
        prefix="Reference number:" 
        style={{marginBottom: 10}} 
        value={invoice.reference}
        readOnly
      />
      <Input 
        prefix="Amount:" 
        suffix="€" 
        style={{marginBottom: 10}}
        type="number"
        value={invoice.amount}
        readOnly
      />
      <Input.Group compact>
        <Button 
          disabled 
          type="dashed"
        >
          Due date
        </Button>
        <DatePicker 
          allowClear 
          value={date}
          disabled
        />
      </Input.Group>
    </Card>
  )
}

export default InvoiceCard;