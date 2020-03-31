import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  padding: 20px;
`;

export const DeliveryContainer = styled.View`
  padding: 15px;
`;
export const DeliveryHeader = styled.View`
  flex-direction: row;
  align-items: center;
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
  margin: 20px 0px 5px;
`;
