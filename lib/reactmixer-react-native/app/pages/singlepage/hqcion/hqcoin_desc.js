import React from 'react';
import ReactDOM from 'react-dom';

import './hqcoin_desc.scss';

export default class HQCionDesc extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='hqcoin-desc'>
        <div style={{height:'5px'}}>
        </div>
        <div className="item">
          <div style={{height:'14px'}}>
          </div>
          <table width="100%" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
            <tr>
              <td width="13%" className='icon-group'>
                <img className="imgask" src={require('./res/ask.png')}>
                </img>
            </td>
            <td width="87%" className="ask">
              <a>
                什么是HQ币？
              </a>
            </td>
          </tr>
          <tr >
            <td className='icon-group'>
              <img className="imganswer" src={require('./res/answer.png')}>
              </img>
          </td>

          <td className='answer'>
            <div className="contentArea">
              HQ币是i保天下app为代理人用户设置的专属积分
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div style={{height:'14px'}}>
      </div>
    </div>

    <div className="item">
      <div style={{height:'14px'}}>
      </div>
      <table width="100%" border="0" cellSpacing="0" cellPadding="0">
        <tbody>
        <tr>
          <td width="13%" className='icon-group'>
            <img className="imgask" src={require('./res/ask.png')}>
          </img>
        </td>
        <td width="87%" className="ask">
          <a>
            如何获得HQ币？
          </a>
        </td>
      </tr>
      <tr >
        <td className='icon-group'>
          <img className="imganswer" src={require('./res/answer.png')}>
        </img>
      </td>

      <td className='answer'>
        <div className="contentArea">
          1.新人指引：一共1项任务获得HQ币（仅限完成一次）<br/>
          (1) 无人不知
          <div style={{height:'10px'}}/>
          2.新兵训练营：一共12项任务获得HQ币（仅限完成一次），完成10项还可赚取额外HQ币 <br/>
          (1) 我要让你知<br/>
          (2) 我要画圈圈<br/>
          (3) 我要学习<br/>
          (4) 我有100万<br/>
          (5) 我要找到你<br/>
          (6) 我要给你看<br/>
          (7) 我要100分<br/>
          (8) 我要见到你<br/>
          (10) 横琴有你<br/>
          (11) 伴他成长<br/>
          (12) 宣传有我
          <div style={{height:'10px'}}/>
          3.最伟大营销员：每日可完12项任务可以赚取活跃度，部分任务可以多次完成可赚取更多活跃度，记得用活跃度兑换获得HQ币，活跃度每日清零；详见任务中心<br/>
          (1) 天天有我<br/>
          (2) 我爱学习<br/>
          (3) 销售为王<br/>
          (4) 我有名单<br/>
          (5) 和你有约<br/>
          (6) 开单有喜<br/>
          (7) 互通有无<br/>
          (8) 横琴有你<br/>
          (9) 拜访之王<br/>
          (10) 宣传有我<br/>
          (11) 会议有我<br/>
          (12) 伴他成长
          <div style={{height:'10px'}}/>
          4.临时任务：平台不定期发布临时任务，完成可获得HQ币
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <div style={{height:'14px'}}>
  </div>
</div>

<div className="item">
  <div style={{height:'14px'}}>
  </div>
  <table width="100%" border="0" cellSpacing="0" cellPadding="0">
    <tbody>
    <tr>
      <td width="13%" className='icon-group'>
        <img className="imgask" src={require('./res/ask.png')}>
      </img>
    </td>
    <td width="87%" className="ask">
      <a>
        HQ币有什么用处？
      </a>
    </td>
  </tr>
  <tr >
    <td className='icon-group'>
      <img className="imganswer" src={require('./res/answer.png')}>
    </img>
  </td>

  <td className='answer'>
    <div className="contentArea">
      1.HQ币抵提现手续费<br/>
      2.HQ币兑赠险<br/>
      3.HQ币兑换：<br/>
      (1) HQ币兑优惠券<br/>
      (2) HQ币兑其他app权益<br/>
      (3) HQ币兑流量<br/>
      (4) HQ币兑实物礼品<br/>
    </div>
  </td>
</tr>
</tbody>
</table>
<div style={{height:'14px'}}>
</div>
</div>

<div className="item">
  <div style={{height:'14px'}}>
  </div>
  <table width="100%" border="0" cellSpacing="0" cellPadding="0">
    <tbody>
    <tr>
      <td width="13%" className='icon-group'>
        <img className="imgask" src={require('./res/ask.png')}>
      </img>
    </td>
    <td width="87%" className="ask">
      <a>
        HQ币会过期吗？
      </a>
    </td>
  </tr>
  <tr >
    <td className='icon-group'>
      <img className="imganswer" src={require('./res/answer.png')}>
    </img>
  </td>

  <td className='answer'>
    <div className="contentArea">
      目前不会，如有变更，平台会提前通知
      <br/>
      <br/>
      <br/>
      亲，只有这么多了
    </div>
  </td>
</tr>
</tbody>
</table>
<div style={{height:'14px'}}>
</div>
</div>
</div>
);
}
}
