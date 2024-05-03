import homeIcon from '../../../../public/left_side_bar_icons/home.png';
import homeSelectedIcon from '../../../../public/left_side_bar_icons/chart_square.svg';

import chatBotIcon from '../../../../public/left_side_bar_icons/headsetUser.png';
import chatBotSelectedIcon from '../../../../public/left_side_bar_icons/headChatBot.png';

import bulkMessageIcon from '../../../../public/left_side_bar_icons/message.png';
import bulkMessageSelectedIcon from '../../../../public/left_side_bar_icons/selectedMessage.png';

import serviceThreeIcon from '../../../../public/left_side_bar_icons/service_three.png';
import serviceThreeSelectedIcon from '../../../../public/left_side_bar_icons/serviceThreeSelected.svg';

export const navigation = [
  {
    id: 1,
    title: 'Home',
    url: '/dashboard',
    icon: homeIcon,
    selectedIcon: homeSelectedIcon,
  },
  {
    id: 2,
    title: 'ChatBot',
    url: '/dashboard/chatbot',
    icon: chatBotIcon,
    selectedIcon: chatBotSelectedIcon,
  },
  {
    id: 3,
    title: 'Bulk Messages',
    url: '/dashboard/bulk-messages',
    icon: bulkMessageIcon,
    selectedIcon: bulkMessageSelectedIcon,
  },
  // {
  //   id: 4,
  //   title: 'Loyalty Program',
  //   // url: '/loyalty-program',
  //   url: '/dashboard/loyalty-program?step=1',
  //   icon: serviceThreeIcon,
  //   selectedIcon: serviceThreeSelectedIcon,
  // },
];
