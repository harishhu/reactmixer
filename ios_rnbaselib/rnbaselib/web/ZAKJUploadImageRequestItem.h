//
//  UploadImageRequestItem.h
//  hengqinlifeapp
//
//  Created by 姚志飞 on 2017/5/2.
//  Copyright © 2017年 横琴人寿. All rights reserved.
//

#import "ZAKJRequestItemBase.h"

@interface ZAKJUploadImageRequestItem : ZAKJRequestItemBase

/** 图片*/
@property (nonatomic,strong)NSMutableArray *images;

/** 文件路径名称*/
@property (nonatomic,strong)NSString *pathName;

@end

@interface ZAKJUploadRecordRequestItem : ZAKJRequestItemBase
/** 录音 */
@property (nonatomic,strong)NSMutableArray *record;

@end

@interface ZAKJUploadFileRequestItem : ZAKJRequestItemBase

/** 文件*/
@property (nonatomic,strong)NSMutableArray *files;
@end

@interface ZAKJIdCardRequest : ZAKJRequestItemBase

/** 证件图片*/
@property (nonatomic,strong)NSMutableArray *picrure;

/** 账户名*/
@property (nonatomic,strong)NSString *accountNo;
/** 密码*/
@property (nonatomic,strong)NSString *password;

/** 文件路径名称*/
@property (nonatomic,strong)NSString *pathName;

@end


@interface ZAKJBankCardRequest : ZAKJRequestItemBase

/** 证件图片*/
@property (nonatomic,strong)NSMutableArray *picrure;

/** 账户名*/
@property (nonatomic,strong)NSString *accountNo;
/** 密码*/
@property (nonatomic,strong)NSString *password;

/** 文件路径名称*/
@property (nonatomic,strong)NSString *pathName;

@end
