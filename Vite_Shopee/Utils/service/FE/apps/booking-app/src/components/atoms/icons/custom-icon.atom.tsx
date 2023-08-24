import Icon from '@ant-design/icons';

export const CustomIcon = props => <Icon component={() => (<img src={props.src} />)} {...props}/>;
