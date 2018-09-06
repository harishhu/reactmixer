
#import <Foundation/Foundation.h>

#define CachedExerciseTaskCompleted @"CachedExerciseTaskCompleted"
#define CachedExerciseSyncAccount @"CachedExerciseSyncAccount"

@interface ZAKJFileCacheManager : NSObject

-(void)saveObjectAsync:(id)object forKey:(NSString *)key;

+ (BOOL)saveObject:(id)object forKey:(NSString *)key;
+ (id)objectForKey:(NSString *)key;

+ (ZAKJFileCacheManager *)sharedInstance;

@end
