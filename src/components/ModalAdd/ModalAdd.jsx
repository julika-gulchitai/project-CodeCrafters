import { ConfigProvider, DatePicker, Space } from 'antd';
import {
  StyledDisabled,
  StyledExpenseActive,
  StyledIncomeActive,
  StyledModalBody,
  StyledModalToggle,
  StyledTransactionAmount,
  StyledTransactionButtonsWrapper,
  StyledTransactionComment,
  StyledTransactionModalSelect,
} from 'components/TransactionsModal/TransactionsModal.styled';
import React, { useState } from 'react';
import Button from '../Button/Button.jsx';
import AccentButton from '../../components/AccentButton/AccentButton.jsx';
import CustomSelect from 'components/CustomSelect/CustomSelect.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { IDfromSelect } from '../../redux/selectors.js';
import { addTransactionThunk } from '../../redux/transactions/operations.js';
import {
  changeModalClose,
  changeToggleState,
} from '../../redux/transactions/transactionsSlice.js';
import {
  LabelToggle,
  SpanToggle,
  ToggleSwitch,
} from 'components/Toggle/Toggle.styled.js';
import { StyledDatePicker } from './ModalAdd.styled.js';

const ModalAdd = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  const onChangeToggle = () => {
    setIsDisabled(!isDisabled);
    setIsChecked(!isChecked);
    dispatch(changeToggleState(isChecked));
  };

  //
  //
  const [date, setDate] = useState('');
  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  const dispatch = useDispatch();

  const id = useSelector(IDfromSelect);
  const createTransaction = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const amountValue = formData.get('amount');
    const comment = formData.get('comment');
    const transaction = {
      transactionDate: `${date}`,
      type: `${!isChecked ? 'INCOME' : 'EXPENSE'}`,
      categoryId: `${!isChecked ? '063f1132-ba5d-42b4-951d-44011ca46262' : id}`,
      comment: `${comment}`,
      amount: `${!isChecked ? amountValue : -amountValue}`,
    };
    dispatch(addTransactionThunk(transaction));
    dispatch(changeModalClose(false));
  };

  return (
    <StyledModalBody onSubmit={createTransaction}>
      <StyledModalToggle>
        {isDisabled ? (
          <StyledDisabled>Income</StyledDisabled>
        ) : (
          <StyledIncomeActive>Income</StyledIncomeActive>
        )}

        <LabelToggle>
          <ToggleSwitch
            defaultChecked
            type="checkbox"
            onChange={onChangeToggle}
            name="type"
          />
          <SpanToggle />
        </LabelToggle>
        {isDisabled ? (
          <StyledExpenseActive>Expense</StyledExpenseActive>
        ) : (
          <StyledDisabled>Expense</StyledDisabled>
        )}
      </StyledModalToggle>

      {isChecked && <CustomSelect />}

      <StyledTransactionModalSelect>
        <StyledTransactionAmount
          type="number"
          placeholder="0.00"
          name="amount"
          required
        />

        {/* <TransactionDate type="date" required /> */}

        <ConfigProvider
          theme={{
            components: {
              DatePicker: {
                activeBg: 'transparent',
                activeBorderColor: 'var(--modal-input-underline)',
                // hoverBorderColor: '#906090',
                hoverBg: 'transparent',
                cellHoverBg: 'var(--balance-bg)',
              },
            },
          }}
        >
          <Space direction="vertical" placeholder="Select date">
            <StyledDatePicker>
              <DatePicker onChange={onChange} />
            </StyledDatePicker>
          </Space>
        </ConfigProvider>
      </StyledTransactionModalSelect>

      <StyledTransactionComment
        name="comment"
        placeholder="Comment"
      ></StyledTransactionComment>

      <StyledTransactionButtonsWrapper>
        <Button title="Add" />
        <AccentButton title="Cancel" />
      </StyledTransactionButtonsWrapper>
    </StyledModalBody>
  );
};

export default ModalAdd;
