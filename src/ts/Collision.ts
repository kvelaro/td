import GameObject from "./GameObject";
//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
export default function Collision(first: GameObject, second: GameObject): boolean {
    if(
        (
            first.x < second.x + second.w() &&
            first.x + first.w() > second.x &&
            first.y < second.y + second.h() &&
            first.y + first.h() > second.y
        )
    ) {
        return true
    }
    return false
}