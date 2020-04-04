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

export const ListContainer = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  background-color: #fff;
  margin-top: 10px;
`;

export const NoContentMessage = styled.Text`
  margin-top: 30px;
  align-self: center;
  font-size: 12px;
  font-weight: bold;
  color: #444;
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#7d40e7',
})`
  align-self: center;
  margin-top: 30px;

  position: absolute;
  bottom: 270px;
  z-index: 999;
`;

export const CustomRefreshControl = styled.RefreshControl.attrs({
  colors: ['#7d40e7'],
  tintColor: '#7159c1',
})``;
