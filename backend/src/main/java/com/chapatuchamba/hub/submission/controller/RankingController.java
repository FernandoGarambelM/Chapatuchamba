package com.chapatuchamba.hub.submission.controller;

import com.chapatuchamba.hub.common.dto.ApiResponse;
import com.chapatuchamba.hub.submission.service.RankingService;
import com.chapatuchamba.hub.user.dto.StudentResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/rankings")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/global")
    public ApiResponse<List<StudentResponseDto>> getGlobalLeaderboard(
            @RequestParam(defaultValue = "10") int limit) {
        return ApiResponse.success(
                "Global Leaderboard retrieved",
                rankingService.getGlobalLeaderboard(limit));
    }
}
