//
//  RCTInterface.m
//  saadtw
//
//  Created by harishhu on 2017/12/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ZAKJRCTInterface.h"
#import "ZAKJReactNative.h"

@implementation ZAKJRCTInterface{
  NSMutableDictionary* cmdItemDict;
  int cmdIndex;
}

RCT_EXPORT_MODULE(saadNativeInterface)

RCT_EXPORT_METHOD(command2Native:(NSString *)cmddata andCallback:(RCTResponseSenderBlock)callback){
    ZAKJReactNative *rn = ZAKJReactNative.instance;
    
    if(!cmdItemDict){
        cmdItemDict = [NSMutableDictionary dictionary];
        [rn setAttachedRCTInterface:self];
    }
    
    cmdIndex++;
    [cmdItemDict setValue:callback forKey:[NSString stringWithFormat:@"%d", cmdIndex]];
    
    [rn handleEventFromJS:[NSString stringWithFormat:@"%d", cmdIndex] commandData:cmddata];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"command2js"];
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

-(void)invokeCallback:(NSString *)cmdCallbackID Parameters: (NSString *)params{
  if (!params) {
    params = @"";
  }
  RCTResponseSenderBlock callback = [cmdItemDict valueForKey:cmdCallbackID];
  if (callback) {
    [cmdItemDict removeObjectForKey:cmdCallbackID];
    callback(@[params]);
  }
}

@end
