import styled from 'styled-components';

export const InvoiceItemContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid darkgrey;
  padding: 7px 0;
  font-size: 20px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media screen and (max-width: 800px) {
    font-size: 18px;
  }

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }`;

export const TextContainer = styled.span`
  white-space: pre;
  margin-right: 10px;
  overflow: auto;
  width: 25%;
  display: flex;

  &:first-child {
    width: 3%;
    overflow: visible ;
  }
  &:last-child {
    width: 7%;
    overflow: visible ;
  }`;

export const RemoveButtonContainer = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;

export const UpdateButtonContainer = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
