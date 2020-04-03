import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

export const Header = styled.View``;

export const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
export const LeftTop = styled.View`
  flex: 6;

  flex-direction: row;
  align-items: center;
`;
export const MiddleTop = styled.View`
  flex: 1;
  margin-left: 10px;
`;
export const WelcomeBack = styled.Text`
  font-size: 12px;
  color: #666;
`;
export const Username = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;
export const LogoutButton = styled(RectButton)`
  flex: 1;
  padding: 10px 10px;
  justify-content: center;
  align-items: center;
`;
export const LogoutIcon = styled(Icon).attrs({
  name: 'exit-to-app',
  size: 22,
  color: '#e74040',
})``;

export const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.Text`
  flex: 1;
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;
export const RightBottom = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 60px;
`;
export const FilterButton = styled(RectButton)`
  padding: 10px 0;
  justify-content: center;
`;
export const FilterText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  ${(props) =>
    props.active
      ? css`
          color: #7d40e7;
          text-decoration: underline;
        `
      : css`
          color: #999;
        `};
`;

export const ListContainer = styled.ScrollView`
  background-color: #fff;
  padding-top: 10px;
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
