import { ButtonIcon, ButtonIcon2, ButtonIcon3 } from './ButtonIcon';
import '../tailwind.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faPlug, faMagnifyingGlass, faDatabase, faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faTrash, faPlus, faMinus, faClone, faArrowsUpDown, faArrowsLeftRight, faCog, faXmark, faSquare, faEye, faPencil, faFolder, faEarListen, faBullhorn, faSquareCheck, faPhone, faSignal, faHammer, faSeedling, faTrophy, faRobot, faPuzzlePiece, faCode, faLeaf, faBaby, faBabyCarriage, faPalette, faComputer } from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faPlug, faMagnifyingGlass, faDatabase, faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faTrash, faPlus, faMinus, faClone, faArrowsUpDown, faArrowsLeftRight, faCog, faXmark, faSquare, faEye, faPencil, faFolder, faEarListen, faBullhorn, faSquareCheck, faPhone, faSignal, faHammer, faSeedling, faTrophy, faRobot,faPuzzlePiece, faCode, faLeaf, faBaby, faBabyCarriage, faDatabase, faEarListen, faSignal, faPalette, faComputer);

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'ButtonIcon',
  component: ButtonIcon,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
  return (
      <div className='flex flex-col space-y-2'>
        <ButtonIcon {...args} />
      </div>
  );
}

const Template2 = (args) => {
  return (
      <div className='flex flex-col space-y-2'>
        <ButtonIcon2 {...args} />
      </div>
  );
}

const Template3 = (args) => {
  return (
      <div className='flex flex-col space-y-2'>
        <ButtonIcon3 {...args} />
      </div>
  );
}
export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args =  {
  //👇 The args you need here will depend on your component
  text: "ButtonIcon",
  icon: "pencil",
  theme: false,
  backgroundColor: 'bg-blue-500',
  textColor: 'text-white',
  hoverBackgroundColor: 'hover:bg-blue-600'
}

Secondary.args =  {
  //👇 The args you need here will depend on your component
  text: "ButtonIcon 2",
  icon: 'pencil',
  theme: false,
  backgroundColor: 'bg-blue-500',
  textColor: 'text-white',
  hoverBackgroundColor: 'hover:bg-blue-600'
}

Tertiary.args =  {
  //👇 The args you need here will depend on your component
  text: "ButtonIcon 3",
  icon: 'pencil',
  theme: false,
  backgroundColor: 'bg-blue-500',
  textColor: 'text-white',
  hoverBackgroundColor: 'hover:bg-blue-600'
}