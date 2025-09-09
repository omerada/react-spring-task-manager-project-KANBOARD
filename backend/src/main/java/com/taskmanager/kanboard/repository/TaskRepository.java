package com.taskmanager.kanboard.repository;

import com.taskmanager.kanboard.entity.BoardColumn;
import com.taskmanager.kanboard.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    List<Task> findByColumnOrderByPosition(BoardColumn column);

    List<Task> findByColumnIdOrderByPosition(UUID columnId);

    Optional<Task> findByIdAndColumnBoardUserUsername(UUID id, String username);

    @Query("SELECT t FROM Task t WHERE t.column.id = :columnId AND t.column.board.user.username = :username ORDER BY t.position")
    List<Task> findByColumnIdAndUserUsernameOrderByPosition(@Param("columnId") UUID columnId,
            @Param("username") String username);

    @Query("SELECT MAX(t.position) FROM Task t WHERE t.column = :column")
    Integer findMaxPositionByColumn(@Param("column") BoardColumn column);

    @Modifying
    @Query("UPDATE Task t SET t.position = t.position + 1 WHERE t.column = :column AND t.position >= :position")
    void incrementPositionsFromPosition(@Param("column") BoardColumn column, @Param("position") Integer position);

    @Modifying
    @Query("UPDATE Task t SET t.position = t.position - 1 WHERE t.column = :column AND t.position > :position")
    void decrementPositionsAfterPosition(@Param("column") BoardColumn column, @Param("position") Integer position);

    @Modifying
    @Query("UPDATE Task t SET t.position = t.position + 1 WHERE t.column = :newColumn AND t.position >= :newPosition")
    void incrementPositionsForInsertion(@Param("newColumn") BoardColumn newColumn,
            @Param("newPosition") Integer newPosition);

    @Modifying
    @Query("UPDATE Task t SET t.position = t.position - 1 WHERE t.column = :oldColumn AND t.position > :oldPosition")
    void decrementPositionsAfterRemoval(@Param("oldColumn") BoardColumn oldColumn,
            @Param("oldPosition") Integer oldPosition);

    boolean existsByIdAndColumnBoardUserUsername(UUID id, String username);

    long countByColumn(BoardColumn column);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.column.board.user.username = :username")
    long countByUserUsername(@Param("username") String username);
}
