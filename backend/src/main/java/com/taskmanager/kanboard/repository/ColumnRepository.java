package com.taskmanager.kanboard.repository;

import com.taskmanager.kanboard.entity.Board;
import com.taskmanager.kanboard.entity.BoardColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ColumnRepository extends JpaRepository<BoardColumn, UUID> {

    List<BoardColumn> findByBoardOrderByPosition(Board board);

    List<BoardColumn> findByBoardIdOrderByPosition(UUID boardId);

    Optional<BoardColumn> findByIdAndBoardUserUsername(UUID id, String username);

    @Query("SELECT c FROM BoardColumn c WHERE c.board.id = :boardId AND c.board.user.username = :username ORDER BY c.position")
    List<BoardColumn> findByBoardIdAndUserUsernameOrderByPosition(@Param("boardId") UUID boardId,
            @Param("username") String username);

    @Query("SELECT MAX(c.position) FROM BoardColumn c WHERE c.board = :board")
    Integer findMaxPositionByBoard(@Param("board") Board board);

    @Query("SELECT MAX(c.position) FROM BoardColumn c WHERE c.board.id = :boardId")
    Optional<Integer> getMaxPositionByBoardId(@Param("boardId") UUID boardId);

    @Query("SELECT c FROM BoardColumn c LEFT JOIN FETCH c.board WHERE c.id = :columnId")
    Optional<BoardColumn> findByIdWithBoard(@Param("columnId") UUID columnId);

    @Modifying
    @Query("UPDATE BoardColumn c SET c.position = c.position + 1 WHERE c.board = :board AND c.position >= :position")
    void incrementPositionsFromPosition(@Param("board") Board board, @Param("position") Integer position);

    @Modifying
    @Query("UPDATE BoardColumn c SET c.position = c.position + 1 WHERE c.board.id = :boardId AND c.position >= :position")
    void incrementPositionsFromPosition(@Param("boardId") UUID boardId, @Param("position") Integer position);

    @Modifying
    @Query("UPDATE BoardColumn c SET c.position = c.position - 1 WHERE c.board = :board AND c.position > :position")
    void decrementPositionsAfterPosition(@Param("board") Board board, @Param("position") Integer position);

    @Modifying
    @Query("UPDATE BoardColumn c SET c.position = c.position - 1 WHERE c.board.id = :boardId AND c.position >= :position")
    void decrementPositionsFromPosition(@Param("boardId") UUID boardId, @Param("position") Integer position);

    @Modifying
    @Query("UPDATE BoardColumn c SET c.position = c.position - 1 WHERE c.board.id = :boardId AND c.position BETWEEN :startPos AND :endPos")
    void decrementPositionsBetween(@Param("boardId") UUID boardId, @Param("startPos") Integer startPos,
            @Param("endPos") Integer endPos);

    @Modifying
    @Query("UPDATE BoardColumn c SET c.position = c.position + 1 WHERE c.board.id = :boardId AND c.position BETWEEN :startPos AND :endPos")
    void incrementPositionsBetween(@Param("boardId") UUID boardId, @Param("startPos") Integer startPos,
            @Param("endPos") Integer endPos);

    boolean existsByIdAndBoardUserUsername(UUID id, String username);

    long countByBoard(Board board);
}
