/// <reference types="react" />
import { type AvatarProps } from "@radix-ui/react-avatar";
import { type User } from "@acme/db/schema/users";
type UserAvatarProps = AvatarProps & {
    user: Partial<User>;
    showActiveIndicator?: boolean;
    size?: number;
};
export declare function UserAvatar({ user, className, size, ...props }: UserAvatarProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=user-avatar.d.ts.map