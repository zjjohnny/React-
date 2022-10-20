import React, { useState } from 'react';
import { Button } from 'antd';
import style from './Freestyle.module.scss';
import { useNavigate } from 'react-router-dom';
import BraftEditor from 'braft-editor'// 引入编辑器组件
import 'braft-editor/dist/index.css'
const EditFreestyle = () => {
  const navigate = useNavigate()
  // 副文本编辑框的值
  const [editorValue, seteditorValue] = useState('')
  const [editorState, seteditorState] = useState('');
  const [outputHTML, setoutputHTML] = useState('');
  const handleChange = (e) => {
    console.log('%c ======>>>>>>>>','color:orange;',e.toHTML().replace(/<[^>]+>/g, ""))
    seteditorValue(e.toHTML().replace(/<[^>]+>/g, ""))
    seteditorState(e)
    setoutputHTML(e.toHTML())
  }
  const submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const outputHTML = editorState.toHTML()
  }

  return (
    <div>
      <div className={style.titele}>
        <div>    <h1>编辑-平台资质</h1></div>
        <div>   <Button onClick={()=>{
          // editorValue
          seteditorValue('')
          navigate('/main/freestyle')
        }}>取消</Button><Button>保存</Button></div>
      </div>
      <div>
        <div className={style.conetns}>
          <BraftEditor
            value={editorState}
            onChange={handleChange}
            onSave={submitContent}
            className={style.editor}
          />
        </div>

      </div>
    </div>
  );
}

export default EditFreestyle;
