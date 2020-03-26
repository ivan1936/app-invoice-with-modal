import styled from 'styled-components';

export const InvoicePageContainer = styled.div`
  width: 90%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  @media screen and (max-width: 800px) {
    width: 90%;
  }`;

export const InvoiceHeaderContainer = styled.div`
  width: 100%;
  height: 35px;
  color: forestgreen;
  border-bottom: 1px solid darkgrey;  
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    height: 30px;
  }

  @media screen and (max-width: 500px) {
    height: 25px;
  }`;

export const HeaderBlockContainer = styled.div`
  text-transform: capitalize;  
  margin-right: 10px;
  width: 25%;
  display: flex;

  &:first-child {
    width: 3%;
    overflow: visible ;
  }
  &:last-child {
    width: 7%;
  }`;

  export const CustomButtonContainer = styled.div`
    margin-right: auto;    
    margin-top: 50px;
    margin-bottom: 25px;
    
    @media screen and (max-width: 800px) {
      width: 30%;
    }

    @media screen and (max-width: 500px) {
      width: 20%;
    }`;