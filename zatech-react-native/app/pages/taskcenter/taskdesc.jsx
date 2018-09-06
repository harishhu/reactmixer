import React from 'react';
import ReactDOM from 'react-dom';

import './taskdesc.scss';

export default class TaskDesc extends React.Component{
  constructor(props){
    super(props);

    this.setNativeHeader();
  }

  setNativeHeader(){
    webappjsinterface.setJnjectCallback(()=>{
      webappjsinterface.setWebViewTitle('任务说明');
    });
  }

  render(){
    return (
      <div className='taskdesc'>
        <div style={{height:'5px'}}>
        </div>
        <table width="100%" border="0" cellSpacing="0" cellPadding="0">
          <tbody>
          <tr>
            <td width="6.5%" className='row1-group'>
            <h3 className='index-row'>
              一、
            </h3>
          </td>
          <td width="94.5%" className="ask">
            <h3>
              &nbsp;&nbsp;&nbsp;新人指引
            </h3>
            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
              <tr>
                <td width="8%" className='row1-group'>
                <a className='index-row'>
                  1.
                </a>
              </td>
              <td width="92%" className="ask">
                <a>
                  新人指引：首次使用APP，默认开启“新人指引”任务。用户可以一步一步跟着指引看完新人使用要领。该项任务不给奖励。
                </a>
              </td>
            </tr>
            <tr>
              <td  className='row1-group'>
              <a className='index-row'>
                2.
              </a>
            </td>
            <td className="ask">
              <a>
                无人不知：可以上传照片，同时成功分享名片一次，分享完成之后，需要选择返回到i保天下中，才能计算为任务完成。
              </a>
            </td>
          </tr>
          </tbody>
          </table>
          </td>
        </tr>
        <tr>
          <td width="6.5%" className='row1-group'>
          <h3 className='index-row'>
            二、
          </h3>
        </td>
        <td width="94.5%" className="ask">
          <h3>
            &nbsp;&nbsp;&nbsp;新兵训练营
          </h3>
          说明：以下12个任务中，完成10个任务即为完成新兵训练营任务，就可以开启“伟大的营销员”这项任务啦~，如果还剩余2个任务没有完成，仍可以继续完成获取奖励。新兵训练营中的任务均是完成1次，即为完成单项任务。（其中，任务8、9、11将在10月底上线）
          <table width="100%" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
            <tr>
              <td width="8%" className='row1-group'>
              <a className='index-row'>
                1.
              </a>
            </td>
            <td width="92%" className="ask">
              <a>
                我要让你知：将名片成功分享至10人，分享完成之后，需要返回到i保天下中，此案计算为任务完成。
              </a>
            </td>
          </tr>
          <tr>
            <td  className='row1-group'>
            <a className='index-row'>
              2.
            </a>
          </td>
          <td className="ask">
            <a>
              我要画圈圈：进入考勤模块，在公司指定区域内打卡成功1次。（考勤模块为业务员上班考勤，会进入公司考核）
            </a>
          </td>
        </tr>
        <tr>
          <td  className='row1-group'>
          <a className='index-row'>
            3.
          </a>
        </td>
        <td className="ask">
          <a>
            我要学习：通过学习模块，阅读查看学习文本资料或在线观看视频音频资料，阅读或观看1次，即为完成本次学习。

          </a>
        </td>
      </tr>
      <tr>
        <td  className='row1-group'>
        <a className='index-row'>
          4.
        </a>
      </td>
      <td className="ask">
        <a>
          我有100万：销售1件百万保额以上短期产品，且完成承保，即为任务完成。

        </a>
      </td>
    </tr>
    <tr>
      <td  className='row1-group'>
      <a className='index-row'>
        5.
      </a>
    </td>
    <td className="ask">
      <a>
        我要找到你：新增1名客户，且至少满足姓名、电话、证件类型、证件号码必录，就算客户信息录入完成，可进行奖励。仅限新增客户。

      </a>
    </td>
  </tr>
  <tr>
    <td  className='row1-group'>
    <a className='index-row'>
      6.
    </a>
  </td>
  <td className="ask">
    <a>
      我要看到你：将手机通讯录导入到客户中心，即为任务完成。

    </a>
  </td>
</tr>
<tr>
  <td  className='row1-group'>
  <a className='index-row'>
    7.
  </a>
</td>
<td className="ask">
  <a>
    我要给你讲：制作1份计划书，并成功分享给朋友。

  </a>
</td>
</tr>
<tr>
  <td  className='row1-group'>
  <a className='index-row'>
    8.
  </a>
</td>
<td className="ask">
  <a>
    我要让你看：在展业夹中，成功分享海报1张海报给朋友，即为任务完成。

  </a>
</td>
</tr>
<tr>
  <td  className='row1-group'>
  <a className='index-row'>
    9.
  </a>
</td>
<td className="ask">
  <a>
    我要邀请你：在展业夹中，制作活动，并成功发送1次邀请函给朋友，即为任务完成。

  </a>
</td>
</tr>
<tr>
  <td  className='row1-group'>
  <a className='index-row'>
    10.
  </a>
</td>
<td className="ask">
  <a>
    我要见到你：在工作日程中，完成1份日志填写，且日志内容中包括图片和定位，即为任务完成。仅限新增日志。

  </a>
</td>
</tr>
<tr>
  <td  className='row1-group'>
  <a className='index-row'>
    11.
  </a>
</td>
<td className="ask">
  <a>
    我要100分：学习模块中，完成代理人考试，且达到60分以上，即为完成任务。

  </a>
</td>
</tr>
<tr>
  <td  className='row1-group'>
  <a className='index-row'>
    12.
  </a>
</td>
<td className="ask">
  <a>
    我来保护你：销售1件长期险产品，且完成承保，即为任务完成。

  </a>
</td>
</tr>
        </tbody>
        </table>
        </td>
      </tr>
      <tr>
        <td width="6.5%" className='row1-group'>
        <h3 className='index-row'>
          三、
        </h3>
      </td>
      <td width="94.5%" className="ask">
        <h3>
          &nbsp;&nbsp;&nbsp;最伟大的营销员
        </h3>
        说明： “最伟大的营销员”中的任务，为每日营销员需要完成的任务，每完成一项，奖励对应的活跃度，每天的活跃度，可以在当晚24点之前兑换积分，方可有效。每日活跃度，达到对应的档次，才能兑换哦~（其中，任务3、5将在10月底上线）
        <table width="100%" border="0" cellSpacing="0" cellPadding="0">
          <tbody>
          <tr>
            <td width="8%" className='row1-group'>
            <a className='index-row'>
              1.
            </a>
          </td>
          <td width="92%" className="ask">
            <a>
              天天有我：每天登录APP之后，进行打卡签到，签到成功，即为任务完成。任务上限：1次/日。如果在没有开启伟大营销员的时候签到，则不计入任务中。

            </a>
          </td>
        </tr>
        <tr>
          <td  className='row1-group'>
          <a className='index-row'>
            2.
          </a>
        </td>
        <td className="ask">
          <a>
            和你有约：制作1份计划书，并成功分享给朋友。任务上限：1次/日。

          </a>
        </td>
      </tr>
      <tr>
        <td  className='row1-group'>
        <a className='index-row'>
          3.
        </a>
      </td>
      <td className="ask">
        <a>
          互通有无：在展业夹中，成功分享海报1张海报，或分享理念1份给朋友，即为任务完成。任务上限：1次/日。

        </a>
      </td>
    </tr>
    <tr>
      <td  className='row1-group'>
      <a className='index-row'>
        4.
      </a>
    </td>
    <td className="ask">
      <a>
        我有名单：新增客户3人（不包括投保生成的客户），且新增的客户内容中需要包括：姓名、电话、证件类型、证件号码，新增3名客户后，一次性给予奖励。任务上限：3人/日，仅限新增客户。

      </a>
    </td>
  </tr>
  <tr>
    <td  className='row1-group'>
    <a className='index-row'>
      5.
    </a>
  </td>
  <td className="ask">
    <a>
      我爱学习：学习模块中，完成代理人考试，考试通过且达到60分以上，即为完成任务。任务上限：1次/日。

    </a>
  </td>
</tr>
<tr>
  <td  className='row1-group'>
  <a className='index-row'>
    6.
  </a>
</td>
<td className="ask">
  <a>
    拜访之王：在工作日程中，完成“拜访”类型的日志填写，且日志内容中包括图片和定位，即为任务完成。任务上限：5次/日，最多可奖励5次，仅限新增日志。

  </a>
</td>
</tr>
<tr>
<td  className='row1-group'>
<a className='index-row'>
  7.
</a>
</td>
<td className="ask">
<a>
  宣传有我：在工作日程中，完成“宣传”类型的日志填写，且日志内容中包括图片和定位，即为任务完成。任务上限：1次/日，仅限新增日志。

</a>
</td>
</tr>
<tr>
<td  className='row1-group'>
<a className='index-row'>
  8.
</a>
</td>
<td className="ask">
<a>
  开单有喜：销售短期产品，且完成承保，即为任务完成。任务上限：N次/日，无上限。

</a>
</td>
</tr>
<tr>
<td  className='row1-group'>
<a className='index-row'>
  9.
</a>
</td>
<td className="ask">
<a>
  销售之王：销售长期险产品，且完成承保，即为任务完成。任务上限：N次/日，无上限。

</a>
</td>
</tr>
<tr>
<td  className='row1-group'>
<a className='index-row'>
  10.
</a>
</td>
<td className="ask">
<a>
  横琴有你：推荐其他人员完成入职，系统成功返回工号，即可领取奖励。任务上限：N次/日，无上限。

</a>
</td>
</tr>
<tr>
<td  className='row1-group'>
<a className='index-row'>
  11.
</a>
</td>
<td className="ask">
<a>
  伴他成长：陪同其他组员拜访客户，即在工作日程中，完成“陪访”类型的日志填写，且日志内容中包括图片和定位，则为任务完成。任务上限：2次/日，最多可奖励2次。，仅限新增日志。

</a>
</td>
</tr>
<tr>
<td  className='row1-group'>
<a className='index-row'>
  12.
</a>
</td>
<td className="ask">
<a>
  会议有我：带朋友或客户参加创说会或产说会，即，在工作日程中，完成“创说会”或“产说会”类型的日志填写，且日志内容中包括图片和定位，即为任务完成。任务上限：1次/日，仅限新增日志。

</a>
</td>
</tr>
      </tbody>
      </table>
      </td>
    </tr>
    <tr>
      <td width="6.5%" className='row1-group'>
      <h3 className='index-row'>
        四、
      </h3>
    </td>
    <td width="94.5%" className="ask">
      <h3>
        &nbsp;&nbsp;&nbsp;疑问解答
      </h3>
      <table width="100%" border="0" cellSpacing="0" cellPadding="0">
        <tbody>
        <tr>
          <td width="8%" className='row1-group'>
          <a className='index-row'>
            1.
          </a>
        </td>
        <td width="92%" className="ask">
            问：“我要画圈圈”和“天天有我”有什么区别？
            <br/>
            答：
          <table width="100%" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
            <tr>
              <td width="8%" className='row1-group'>
              <a className='index-row'>
                a)
              </a>
            </td>
            <td width="92%" className="ask">
              <a>
                我要画圈圈：需要进入考勤模块，是给业务员上班考勤记录所用，在公司指定办公网点进行打卡，会进入公司考勤的考核中，内勤管理员查询追踪。

              </a>
            </td>
          </tr>
          <tr>
            <td width="8%" className='row1-group'>
            <a className='index-row'>
              b)
            </a>
          </td>
          <td width="92%" className="ask">
            <a>
              天天有我：每天登录APP之后，进行签到，是使用APP的一个签到，不计入公司考核，但是签到了，可以获取活跃度哦~

            </a>
          </td>
        </tr>
        </tbody>
      </table>
        </td>
      </tr>
      <tr>
        <td  className='row1-group'>
        <a className='index-row'>
          2.
        </a>
      </td>
      <td className="ask">
        <a>
          问：名片分享成功，没有完成任务？
          答：分享类任务，分享成功之后，需要选择返回到i保天下中，才能计算为任务完成哦~
        </a>
      </td>
    </tr>
    <tr>
      <td  className='row1-group'>
      <a className='index-row'>
        3.
      </a>
    </td>
    <td className="ask">
      <a>
        问：我当日获取了450活跃度，能兑换450的HQ币吗？ （如：分300-600-900-1200四档）
        答：不能。只能兑换300的HQ币，如果在当日不能继续累计到600活跃度，另外的150活跃度，则会作废。
      </a>
    </td>
  </tr>
  <tr>
    <td  className='row1-group'>
    <a className='index-row'>
      4.
    </a>
  </td>
  <td className="ask">
    <a>
      问： 新增客户后，发现有些信息没有录入，再次补录会给奖励吗？
      答：不会。要求一次性将必录信息录入完整。
    </a>
  </td>
</tr>
<tr>
  <td  className='row1-group'>
  <a className='index-row'>
    5.
  </a>
</td>
<td className="ask">
  <a>
    问： 新增客户包括承保客户或进入核心人工核保的准客户吗？
    答：不包括，需进入客户中心新增客户才可领取相应奖励。
  </a>
</td>
</tr>
<tr>
<td  className='row1-group'>
<a className='index-row'>
  6.
</a>
</td>
<td className="ask">
<a>
  问： 新增日志后，发现有些信息没有录入，再次补录会给奖励吗？
  答：不会。要求一次性将必录信息录入完整。
</a>
</td>
</tr>
<tr>
<td  className='row1-group'>
<a className='index-row'>
7.
</a>
</td>
<td className="ask">
<a>
  问： 天天有我任务，为什么点击前往后看到的是已签到页面？
  答： 该任务已在最伟大营销员开启之前完成，则开启最伟大营销员任务的当天，天天有我任务状态会显示为前往，而不是已完成，第二天及以后如已签到，任务状态会显示为已完成。
</a>
</td>
</tr>
<tr>
<td  className='row1-group'>
<a className='index-row'>
8.
</a>
</td>
<td className="ask">
<a>
  问： 活跃度每天清零，为什么页面显示未清零？
  答： 因为当前页面未刷新导致的，其实后台已经清零了，您可以先退出当前页面重新进入。
</a>
</td>
</tr>
    </tbody>
    </table>
    </td>
  </tr>
      </tbody>
      </table>
      <br/>
      <br/>
      <br/>
      <br/>

      </div>
    )
  }
}
