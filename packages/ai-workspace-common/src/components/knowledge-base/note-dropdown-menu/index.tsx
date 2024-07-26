import { IconDelete, IconMore } from '@arco-design/web-react/icon';
import { Dropdown, Menu, Button, Popconfirm, Message } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
// 类型
import { Note } from '@refly/openapi-schema';
// 请求
import getClient from '@refly-packages/ai-workspace-common/requests/proxiedRequest';
import { useNavigate } from 'react-router-dom';

const iconStyle = {
  marginRight: 8,
  fontSize: 16,
  transform: 'translateY(1px)',
};

interface DropListProps {
  setPopupVisible: (visible: boolean) => void;
  handleDeleteClick: (e: any) => void;
}

const DropList = (props: DropListProps) => {
  const { setPopupVisible, handleDeleteClick } = props;

  return (
    <Menu>
      <Menu.Item key="1">
        <Popconfirm
          focusLock
          title="确定删除该笔记吗？"
          position="br"
          onOk={handleDeleteClick}
          onCancel={() => setPopupVisible(false)}
        >
          <IconDelete style={iconStyle} />
          删除
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );
};

interface NoteDropdownMenuProps {
  note: Note;
}

export const NoteDropdownMenu = (props: NoteDropdownMenuProps) => {
  const { note } = props;
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);

  const handleDeleteClick = async (e: MouseEvent) => {
    const { error } = await getClient().deleteNote({ body: { noteId: note.noteId } });
    setPopupVisible(false);
    if (error) {
      console.error(error);
      Message.error({ content: `删除失败` });
    } else {
      Message.success({ content: '删除成功' });
      navigate('/knowledge-base?noteId=');
    }
  };

  const droplist = DropList({ setPopupVisible, handleDeleteClick });

  return (
    <Dropdown
      position="br"
      popupVisible={popupVisible}
      droplist={droplist}
      triggerProps={{ onClickOutside: () => setPopupVisible(false) }}
    >
      <Button
        icon={<IconMore style={{ fontSize: 16 }} />}
        type="text"
        onClick={() => setPopupVisible(!popupVisible)}
        className={'assist-action-item'}
      ></Button>
    </Dropdown>
  );
};
