

#import "ZAKJFileCacheManager.h"

@interface ZAKJFileCacheManager()
{
    dispatch_queue_t _fileCacheQueue;
}
@end

@implementation ZAKJFileCacheManager

- (void)saveObjectAsync:(id)object forKey:(NSString *)key
{
    dispatch_async(_fileCacheQueue, ^{
        [ZAKJFileCacheManager saveObject:object forKey:key];
    });
}

+ (BOOL)saveObject:(id)object forKey:(NSString *)key
{
    BOOL result = NO;
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSString *dataPath = [documentsDirectory stringByAppendingPathComponent:key];
    NSData *saveData = [NSKeyedArchiver archivedDataWithRootObject:object];
    if(object)
    {
        result = [saveData writeToFile:dataPath atomically:YES];
    }
    else
    {
        NSFileManager * fm = [NSFileManager defaultManager];
        NSError* error;
        
        result = [fm removeItemAtPath:dataPath error:&error];
    }
    return result;
}

+ (id)objectForKey:(NSString *)key
{
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSString *dataPath = [documentsDirectory stringByAppendingPathComponent:key];
    NSFileManager * fm = [NSFileManager defaultManager];
    
    NSData *savedData = [fm contentsAtPath:dataPath];
    
    if(savedData)
    {
        return [NSKeyedUnarchiver unarchiveObjectWithData:savedData];
    }
    
    return nil;
}

static ZAKJFileCacheManager *sharedInstance = nil;
+ (ZAKJFileCacheManager *)sharedInstance
{
    static dispatch_once_t token;
    dispatch_once(&token, ^{
        sharedInstance = [[[self class] alloc] init];
    });
    return sharedInstance;
}

- (id)init
{
    self = [super init];
    if(self)
    {
        _fileCacheQueue = dispatch_queue_create("hu.reactmixer.fileCacheThread", DISPATCH_QUEUE_SERIAL);
    }
    return self;
}

@end
