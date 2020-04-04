import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

export const DeliveryContainer = styled.View.attrs({
  elevation: 1,
})`
  padding-top: 10px;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 4px;
`;
export const DeliveryHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;
export const HeadingIcon = styled(Icon).attrs({
  name: 'local-shipping',
  size: 22,
  color: '#7d40e7',
})``;
export const HeadingText = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
`;

export const StatusContainer = styled.View`
  margin: 20px 15px 10px;
`;

export const DeliveryFooter = styled.View`
  background-color: #f8f9fd;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;
export const RegistrationDate = styled.View`
  flex: 1;

  padding: 20px 0px;
  padding-left: 15px;
  border-bottom-left-radius: 4px;
  justify-content: flex-end;
`;
export const RecipientCity = styled.View`
  flex: 1;

  padding: 20px 0px;
  padding-left: 20px;
  justify-content: flex-end;
`;
export const Label = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999;
`;
export const Value = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444;
`;
export const GoToDetailsButton = styled(RectButton)`
  flex: 1;

  padding: 20px 15px;
  border-radius: 4px;
  justify-content: flex-end;
  align-items: center;
`;
export const GoToDetailsText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #7d40e7;
`;
