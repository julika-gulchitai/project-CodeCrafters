import styled from 'styled-components';

export const CurrencyTable = styled.table`
  width: 100%;
  background: transparent;
  border-collapse: collapse;
`;

export const CurrencyThead = styled.thead`
  background: rgba(255, 255, 255, 0.2);
  display: table-header-group;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
  th {
    border: 0;
    border: none;
    padding: 16px;
    color: #fbfbfb;
    /* font-family: Poppins; */
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const CurrencyTbody = styled.tbody`
  text-align: center;
  tr {
    background: transparent;
    height: 48px;
  }
  td {
    color: #fbfbfb;
    font-family: Poppins;
    font-size: 16px;
    /* font-size: 16px; */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

// export const CurrencyWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   ul {
//     display: flex;
//     flex-direction: row;
//   }
// `;