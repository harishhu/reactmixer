//
//  SAReactNativeViewController.m
//  saadtw
//
//  Created by 姚志飞 on 2018/2/27.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ZAKJReactNativeViewController.h"
#import "ZAKJReactNative.h"

@interface ZAKJReactNativeViewController ()
@end

@implementation ZAKJReactNativeViewController

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  self.navigationController.fd_fullscreenPopGestureRecognizer.enabled = NO;
  [self.navigationController setNavigationBarHidden:YES animated:NO];
}

- (void)viewWillDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  self.navigationController.fd_fullscreenPopGestureRecognizer.enabled = YES;
  [self.navigationController setNavigationBarHidden:YES animated:NO];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [ZAKJReactNative.instance startModule: self.modulename inSuper:self launchData:self.launchData];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (BOOL)needHiddenNavigationBar{
    return YES;
}

@end
