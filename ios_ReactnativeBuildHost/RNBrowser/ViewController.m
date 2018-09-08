//
//  ViewController.m
//  RNBrowser
//
//  Created by harishhu on 2018/6/8.
//  Copyright © 2018年   ReactMixer. All rights reserved.
//

#import "ViewController.h"
#import <rnbaselib/rnbaselib.h>
#import <Masonry.h>

#define KEY_RNSERVER @"rnserver"
#define KEY_ENTERYMODULE @"entrymodule"

#define ZAKJ_SDK_PROMPT @"Powered by ZAKJ-APPSDK-V1.0.0"

#define kIs_iPhoneX (kSCREEN_WIDTH == 375.f && kSCREEN_HEIGHT == 812.f)
#define kSCREEN_WIDTH  ([UIScreen mainScreen].bounds.size.width)
#define kSCREEN_HEIGHT ([UIScreen mainScreen].bounds.size.height)

#define SafeAreaTopHeight (kIs_iPhoneX ? 88 : 64)

@interface ViewController ()
@end

@implementation ViewController{
    UILabel *serverLabel;
    UITextField *serverAddress;
    
    UILabel *moduleNameLabel;
    UITextField *moduleNameEdit;
    
    NSString *rnserver;
    NSString *moduleEntry;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    rnserver = [self getConfigData:KEY_RNSERVER];
    if (rnserver == nil) {
        rnserver = @"";
    }
    
    moduleEntry = [self getConfigData:KEY_ENTERYMODULE];
    if (moduleEntry == nil) {
        moduleEntry = @"index";
    }
    
    [self initViews];
    // Do any additional setup after loading the view, typically from a nib.
}

-(void)initViews{
    [self initAddressViews];
    [self initModuleNameViews];
    [self initButton];
}

-(void)initAddressViews{
    serverLabel = [[UILabel alloc]init];
    [self.view addSubview:serverLabel];
    serverLabel.text = @"设置RN Server:";
    
    serverLabel.backgroundColor = [UIColor whiteColor];
    serverLabel.font = [UIFont systemFontOfSize:15 weight:UIFontWeightSemibold];
    [serverLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_equalTo(SafeAreaTopHeight + 10);
        make.left.mas_equalTo(10);
    }];
    
    [serverLabel setContentHuggingPriority:UILayoutPriorityRequired forAxis:UILayoutConstraintAxisHorizontal];
    
    serverAddress = [[UITextField alloc]init];
    [self.view addSubview:serverAddress];
    serverAddress.font = [UIFont systemFontOfSize:15 weight:UIFontWeightSemibold];
    
    if (rnserver.length == 0) {
        serverAddress.placeholder = @"example: 192.168.8.8";
    }else{
        serverAddress.text = rnserver;
    }
    
    [serverAddress mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_equalTo(serverLabel.mas_bottom).mas_offset(5);
        make.left.mas_equalTo(15);
        make.right.mas_equalTo(self.view.mas_right).offset(15);
        make.height.mas_equalTo(30);
    }];
    
    serverAddress.backgroundColor = [UIColor whiteColor];
    [serverAddress addTarget:self action:@selector(serverTextChanged:) forControlEvents:UIControlEventEditingChanged];
}

-(void)initModuleNameViews{
    moduleNameLabel = [[UILabel alloc]init];
    [self.view addSubview:moduleNameLabel];
    moduleNameLabel.text = @"设置Entry module:";
    
    moduleNameLabel.backgroundColor = [UIColor whiteColor];
    moduleNameLabel.font = [UIFont systemFontOfSize:15 weight:UIFontWeightSemibold];
    [moduleNameLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_equalTo(serverAddress.mas_bottom).mas_offset(5);
        make.left.mas_equalTo(10);
    }];
    
    [moduleNameLabel setContentHuggingPriority:UILayoutPriorityRequired forAxis:UILayoutConstraintAxisHorizontal];
    
    moduleNameEdit = [[UITextField alloc]init];
    [self.view addSubview:moduleNameEdit];
    moduleNameEdit.font = [UIFont systemFontOfSize:15 weight:UIFontWeightSemibold];
    
    if (moduleEntry.length == 0) {
        moduleNameEdit.placeholder = @"index";
    }else{
        moduleNameEdit.text = moduleEntry;
    }
    
    [moduleNameEdit mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_equalTo(moduleNameLabel.mas_bottom).mas_offset(5);
        make.left.mas_equalTo(15);
        make.right.mas_equalTo(self.view.mas_right).offset(15);
        make.height.mas_equalTo(30);
    }];
    
    moduleNameEdit.backgroundColor = [UIColor whiteColor];
    [moduleNameEdit addTarget:self action:@selector(moduleNameTextChanged:) forControlEvents:UIControlEventEditingChanged];
}

-(void)initButton{
    UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
    button.backgroundColor = [UIColor blueColor];
    button.layer.cornerRadius = 5;
    [self.view addSubview:button];
    
    [button setTitle:@"打开" forState:UIControlStateNormal];
    [button mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_equalTo(moduleNameEdit.mas_bottom).mas_offset(20);
        make.size.mas_equalTo(CGSizeMake(300, 45));
        make.centerX.equalTo(self.view);
    }];
    
    [button addTarget:self action:@selector(openRNBrowser:) forControlEvents:UIControlEventTouchUpInside];
    
    UILabel *sdkVersion = [[UILabel alloc]init];
    [self.view addSubview:sdkVersion];
    sdkVersion.text = ZAKJ_SDK_PROMPT;

    sdkVersion.backgroundColor = [UIColor whiteColor];
    sdkVersion.textColor = [UIColor grayColor];
    sdkVersion.font = [UIFont systemFontOfSize:10 weight:UIFontWeightThin];
    [sdkVersion mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_equalTo(button.mas_bottom).offset(24);
        make.centerX.equalTo(self.view);
    }];
}

//注意：事件类型是：`UIControlEventEditingChanged`
-(void)serverTextChanged:(id)sender{
    UITextField* target=(UITextField*)sender;
    rnserver = target.text;
    
    [self setCofnigData:KEY_RNSERVER value:rnserver];
    NSLog(@"server: %@",target.text);
}

-(void)moduleNameTextChanged:(id)sender{
    UITextField* target=(UITextField*)sender;
    moduleEntry = target.text;
    
    [self setCofnigData:KEY_ENTERYMODULE value:moduleEntry];
    NSLog(@"module name: %@",target.text);
}

- (void)openRNBrowser:(UIButton *)btn{
    [ZAKJReactNative.instance setJSLocationHost:rnserver];
    [[ZAKJReactNative.instance getRNAppConfig] putConfig:@"rnbrowser - ios" forKey:@"userToken"];
    
    NSLog(@"open rnserver = %@", rnserver);
    
    ZAKJReactNativeViewController *vc = [[ZAKJReactNativeViewController alloc]init];
    vc.modulename = @"hu.reactmixer.home";
    [self.navigationController pushViewController:vc animated:YES];
}

-(NSString *)getConfigData: (NSString *)key{
    return [[NSUserDefaults standardUserDefaults] objectForKey:key];
}

-(void)setCofnigData:(NSString *)key value: (NSString *)v{
    [[NSUserDefaults standardUserDefaults] setObject:v forKey:key];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
@end
