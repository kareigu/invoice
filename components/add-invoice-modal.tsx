import { Dispatch, FC, SetStateAction, useState } from 'react';
import { IInvoice } from '../utils/types';
import { Input, Typography, Modal, Space, Divider, DatePicker, Button } from 'antd';

const { Text } = Typography;

interface IProps {
  api: string,
  visible: boolean,
  setHidden: Dispatch<SetStateAction<boolean>>,
}

const AddInvoiceModal: FC<IProps> = ({api, visible, setHidden}) => {
  const [name, setName] = useState('');
  const [payee, setPayee] = useState('');
  const [account, setAccount] = useState('');
  const [reference, setReference] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [date, setDate] = useState<string>()

  const [loading, setLoading] = useState(false);
  const [statusVisible, setStatusVisible] = useState(false);
  const [statusText, setStatusText] = useState('');


  const handleSubmit = () => {
    setLoading(true);
    if (date === undefined || date === '') {
      setStatusVisible(true);
      setStatusText('Input a date value');
    } else {
      const invoice: IInvoice = {
        name,
        payee,
        account,
        reference,
        amount,
        date
      };
      console.info(invoice);
      fetch(`http://${api}/v1/invoices`, {
        method: 'POST',
        body: JSON.stringify(invoice)
      })
      .then(res => {
        if(res.status === 201) {
          setStatusVisible(true);
          setStatusText('Added new invoice');
          setTimeout(() => {
            setHidden(false);
            setStatusVisible(false);
          }, 2000);
        }
      })
      .catch(err => {
        setStatusVisible(true);
        setStatusText(err);
      })
    }
    setLoading(false);
  }

  return (
    <Modal 
      title="Add a new invoice" 
      visible={visible}
      onCancel={() => setHidden(false)}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Input 
        prefix="Name:" 
        style={{marginBottom: 10}} 
        value={name}
        onChange={e => setName(e.currentTarget.value)}
      />

      <Input 
        prefix="Payee:"
        style={{marginBottom: 10}} 
        value={payee}
        onChange={e => setPayee(e.currentTarget.value)}
      />
      <Input 
        prefix="Account:" 
        style={{marginBottom: 10}} 
        value={account}
        onChange={e => setAccount(e.currentTarget.value)}
      />

      <Input 
        prefix="Reference number:" 
        style={{marginBottom: 10}} 
        value={reference}
        onChange={e => setReference(e.currentTarget.value)}
      />
      <Input 
        prefix="Amount:" 
        suffix="€" 
        style={{marginBottom: 10}}
        type="number"
        step={.01}
        value={amount}
        onChange={e => setAmount(e.currentTarget.valueAsNumber)}
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
          onChange={(_, s) => setDate(s)}
        />
      </Input.Group>
      { statusVisible &&
        <Divider >
          { statusText }
        </Divider>
      }
    </Modal>
  )
}

export default AddInvoiceModal;