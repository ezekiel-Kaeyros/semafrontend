import PreviewComp from '@/app/common/components/forms/bulk-message-form/PreviewComp';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Pagination,
  Modal,
  ModalBody,
  ModalContent,
} from '@nextui-org/react';

const ViewTemplateModal: React.FC<{
  isShow: boolean;
  showHandler: any;
  img: any;
  body: string;
  footer: string;
}> = ({ isShow, showHandler, img, body, footer }) => {
  return (
    <Modal
      isOpen={isShow}
      onOpenChange={showHandler}
      className=" "
    
      placement="center"
      // closeButton={false}
      classNames={{
        wrapper: '',
        // body: "py-6",
        // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        // header: "border-b-[1px] border-[#292f46]",
        // footer: "border-t-[1px] border-[#292f46]",
        // closeButton: 'hidden',
      }}
    >
      <ModalContent>
        <>
          <ModalBody className="text-black p-10">
            {/* <p>x</p> */}
            <div className='w-full h-full border'>
              <PreviewComp
                ImgTemplate={img}
                // ImgTemplate={photographIcon}
                textTemplate={body}
                tagline={footer}
              />
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};
export default ViewTemplateModal;
