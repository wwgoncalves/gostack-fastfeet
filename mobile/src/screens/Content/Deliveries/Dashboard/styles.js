import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  background-color: #fff;
  padding: 20px;
`;

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
  border-top-width: 1px;
  border-top-color: #f8f9fd;
  flex-direction: row;
  justify-content: space-between;
`;
export const RegistrationDate = styled.View`
  padding: 20px 0px;
  padding-left: 15px;
`;
export const RecipientCity = styled.View`
  padding: 20px 0px;
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
  justify-content: flex-end;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px 15px;
`;

export const GoToDetailsText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #7d40e7;
`;

export const DistanceToBottomTab = styled.View`
  margin-bottom: 20px;
`;
