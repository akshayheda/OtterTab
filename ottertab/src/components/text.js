import { Typography } from 'antd';
import styled from 'styled-components';

// reusable text component (also used for testing)
const { Title } = Typography;
export const Text = styled(Title)`
    color: red;
`;